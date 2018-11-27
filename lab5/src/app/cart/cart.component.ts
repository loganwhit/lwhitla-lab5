import { Component, OnInit } from '@angular/core';
import {CartService} from './cart.service';
import {AuthService} from '../core/auth.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ReceiptComponent} from '../receipt/receipt.component'

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
 

  constructor(private cartService : CartService, private authService: AuthService, private router : Router, private dialog : MatDialog,
  ) {this.cartList=this.cartService.getCart();
  this.numbers = Array(10).fill(1).map((x,i)=>i);
    this.minusTen=true;
    
    this.getSum();
    
  }
  getSum(){
    this.sumTotal=0;
    for (var i=0; i<this.cartList.length; i++){
      this.sumTotal += parseFloat(this.cartList[i].quantity)*parseFloat(this.cartList[i].price); 
    }
  }
  buy(){
    if(confirm("Are you sure you want to buy?")){
      
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
  getCart(){
    this.cartList=this.cartService.getCart();
  }
  switchInput(){
    this.minusTen=false;
  }
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
  logout(){
    this.authService.doLogout()
    .then((res) => {
     this.clearItems();
      this.router.navigate(['/start']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }
  
  
  clearItems(){
    if(confirm("Are you sure you want to clear your cart?")){
    var holdLength = this.cartList.length;
    for (var x=0; x<holdLength; x++){
      this.removeItem(this.cartList[0], this.cartList[0].quantity);
    }
    }
  }
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
