import { Component, OnInit } from '@angular/core';
import {CartService} from './cart.service';
import {AuthService} from '../core/auth.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ReceiptComponent} from '../receipt/receipt.component';
import {UserService} from '../core/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList;
  dialogResult;
  numbers;
  minusTen;
  sumTotal;
  isAdmin;
 

  constructor(private cartService : CartService, private authService: AuthService, private router : Router, private dialog : MatDialog, private userService:UserService
  ) {this.cartList=this.cartService.getCart();
  this.numbers = Array(10).fill(1).map((x,i)=>i); //Initializes an array to hold a number from 0-9
    this.minusTen=true;
    
    this.getSum();
    userService.getCurrentUser()
    .then(res => {
      var docRef = authService.getUser(res);
      
      docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
          
           this.isAdmin=doc.data().isAdmin;
        } else {
            authService.addUser(res);
            console.log("No such document!");
        }
    }.bind(this)).catch(function(error) {
        console.log("Error getting document:", error);
    });
    });
  }
  getSum(){
    this.sumTotal=0;
    for (var i=0; i<this.cartList.length; i++){
      this.sumTotal += parseFloat(this.cartList[i].quantity)*parseFloat(this.cartList[i].price); 
    }
    this.sumTotal = this.sumTotal.toFixed(2);
  }
  //Function for buying an item using CartService
  buy(){
    if(confirm("Are you sure you want to buy?")){ //Requests confirmation
      
    this.cartService.buy()
    .then(res => {
      this.openDialog();
      console.log(res);
      this.cartList=this.cartService.getCart();
      this.sumTotal=0;
      
      
  }, err => {
      console.log(err);
    });
    
  }
  }

  ngOnInit() {
  }
  //Gets cart from CartService
  getCart(){
    this.cartList=this.cartService.getCart();
  }
  //Switches input from an select/option box to number entry
  switchInput(){
    this.minusTen=false;
  }
  //Updates database if incrementing or decrementing cart items
  inputChange(quant, cartItem){
    var val = quant;
    // if(this.lastChange==parseInt(val)){
    //   return;
    // }
    console.log(parseInt(val));
    // this.lastChange=parseInt(val);
    if(val>cartItem.quantity){
      this.addCart(cartItem, parseInt(val)-cartItem.quantity);
    }
    else if (val<cartItem.quantity){
      this.removeItem(cartItem, cartItem.quantity-parseInt(val));
    }
      
    
  }
  //Removes an item and its quantity from a cart
  removeItem(cartItem, quant){
    this.cartService.removeCart(cartItem,parseInt(quant))
    .then(res => {
      console.log(res);
      this.getCart();
       this.getSum();
      
  }, err => {
      console.log(err);
    });
  }
  //Logs user out of site
  logout(){
    this.authService.doLogout()
    .then((res) => {
     this.clearItems();
      this.router.navigate(['/start']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }
  
  //Clears all items from cart
  clearItems(){
    if(confirm("Are you sure you want to clear your cart?")){
    var holdLength = this.cartList.length;
    for (var x=0; x<holdLength; x++){
      this.removeItem(this.cartList[0], this.cartList[0].quantity);
    }
    }
  }
//Increases or decreases item quantity in cart
  addCart(cartItem, quant){
  this.cartService.incrementCart(cartItem,quant)
    .then(res => {
      console.log(res);
      this.getCart();
      this.getSum();
  }, err => {
      console.log(err);
    });
  
}
//Opens receipt dialog upon confirmation of purchase
openDialog() {

    
    let dialogRef = this.dialog.open(ReceiptComponent, {
      width: '600px',
      data: {cart : this.cartList, component: this, total:this.sumTotal}
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      // itemObs.unsubscribe();
    });
  

}

}
