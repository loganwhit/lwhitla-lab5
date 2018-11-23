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

  constructor(private cartService : CartService, private authService: AuthService, private router : Router) {this.cartList=this.cartService.getCart(); }

  ngOnInit() {
  }
  getCart(){
    this.cartList=this.cartService.getCart();
  }
  inputChange(cartItem, quant){
    if(quant>cartItem.quantity){
      this.addCart(cartItem, parseInt(quant)-cartItem.quantity);
    }
    else if (quant<cartItem.quantity){
      this.removeItem(cartItem, cartItem.quantity-parseInt(quant));
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
