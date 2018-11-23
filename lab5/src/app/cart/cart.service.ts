import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = './api/items/cart/';
  private cartList;

  constructor() {
    this.cartList=[]}
  addToCart(item,quant){
    var trigger = false;
    var holdItem = JSON.stringify(item);
    var tempItem = JSON.parse(holdItem);
    if(quant>tempItem.quantity){
      alert("Quantity must be smaller or equal to quantity remaining");
      return;
    }
    for (var x=0; x<this.cartList.length; x++){
   
      if(tempItem._id == this.cartList[x]._id){
        this.cartList[x].quantity+=parseInt(quant);
     
        trigger=true;
      }
    }
    
    if (!trigger){
      tempItem.quantity=parseInt(quant);
      this.cartList.push(tempItem);
    }
    var id =tempItem._id;
    var itemUrl = this.url+id;
    var negQuant = quant*-1;
   
    
    let data={
        quantity: negQuant,
    }
   
    
    return new Promise<any>((resolve, reject) => {
      
      fetch(itemUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
        'Content-Type': 'application/json'
  }})
      .then((res) => {
        
        resolve(res.json());
        
      }), err => reject(err.json())
  
  
    });
  }
  removeCart(cartItem, quant){
    
    var id =cartItem._id;
    var itemUrl = this.url+id;
    if(quant==cartItem.quantity){
      this.cartList.splice(this.cartList.indexOf(cartItem),1);
      }
    
   
    
    let data={
        quantity: quant,
    }
    return new Promise<any>((resolve, reject) => {
      
      fetch(itemUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
        'Content-Type': 'application/json'
  }})
      .then((res) => {
        
        resolve(res.json());
        
      }), err => reject(err.json())
  
  
    });
  }
  getCart(){
    return this.cartList;
  }
    
  }

