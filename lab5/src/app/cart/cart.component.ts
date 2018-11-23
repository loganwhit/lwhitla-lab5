import { Component, OnInit } from '@angular/core';
import {CartService} from './cart.service';
import {AuthService} from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList;
  lastChange;
 

  constructor(private cartService : CartService, private authService: AuthService, private router : Router) {this.cartList=this.cartService.getCart(); }

  ngOnInit() {
  }
  getCart(){
    this.cartList=this.cartService.getCart();
  }
  inputChange(quant, cartItem){
    var val = quant.target.value;
    if(this.lastChange==parseInt(val)){
      return;
    }
    console.log(parseInt(val));
    this.lastChange=parseInt(val);
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
  }, err => {
      console.log(err);
    });
  }
  logout(){
    this.authService.doLogout()
    .then((res) => {
     
      this.router.navigate(['/start']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }
  
  
  clearItems(){
    var holdLength = this.cartList.length;
    for (var x=0; x<holdLength; x++){
      this.removeItem(this.cartList[0], this.cartList[0].quantity);
    }
  }
  addCart(cartItem, quant){
  this.cartService.addToCart(cartItem,quant)
    .then(res => {
      console.log(res);
      this.getCart();
  }, err => {
      console.log(err);
    });
  
}

}
