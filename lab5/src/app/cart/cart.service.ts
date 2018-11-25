import { Injectable } from '@angular/core';
import {StartService} from '../start/start.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = './api/items/cart/';
  private cartList;
  private catalogList;
  

  constructor(private startServ : StartService) {
    this.cartList=[];
    this.getCatalogList();
  }
  buy(){
    var buyUrl = './api/items/cartBuy/buy';
    for(var i=0; i<this.cartList.length; i++){
      this.cartList[i].itemsSold+=this.cartList[i].quantity;
    }
    
    
   
    //for(var i =0; i<this.cartList.length; i++ ){
    
    // for(var i=0; i<this.cartList.length; i++){
    
    
    // var id =this.cartList[0]._id;
    // var buyUrl = buyUrl+id;
    
    let data={
      cart: this.cartList
    }
    
    
    return new Promise<any>((resolve, reject) => {
      
      fetch(buyUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
        'Content-Type': 'application/json'
  }})
      .then((res) => {
        
        resolve(res.json());
        this.cartList=[];
        this.getCatalogList();
       
        
      }), err => reject(err.json());
    
  
  
    })
    
    
  // }
  
  }
  incrementCart(item,quant){
    var trigger = false;
    var holdItem = JSON.stringify(item);
    var tempItem = JSON.parse(holdItem);
    // item.quantity=itemQuantity-quant;
    var itemQuantity;
    for (var x=0; x<this.catalogList.length; x++){
      if(tempItem._id == this.catalogList[x]._id){
        itemQuantity=this.catalogList[x].quantity;
      }
    }
    if(quant>itemQuantity){
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
        this.getCatalogList();
        
      }), err => reject(err.json())
  
  
    });
  
    
  }
 
  getCatalogList(){
    this.catalogList=this.startServ.getAll();
  }
  addToCart(item,quant){
    
    var trigger = false;
    var holdItem = JSON.stringify(item);
    var tempItem = JSON.parse(holdItem);
    item.quantity-=parseInt(quant);
    var itemQuantity;
    for (var x=0; x<this.catalogList.length; x++){
   
      if(tempItem._id == this.catalogList[x]._id){
        itemQuantity=this.catalogList[x].quantity;
      }
    }
    if(quant>itemQuantity){
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
        this.getCatalogList();
        
      }), err => reject(err.json())
  
  
    });
  }
  removeCart(cartItem, quant){
    
    var id =cartItem._id;
    var itemUrl = this.url+id;
    
    if(quant==cartItem.quantity){
      this.cartList.splice(this.cartList.indexOf(cartItem),1);
      }
    else {
      cartItem.quantity -= parseInt(quant);
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
        this.getCatalogList();
        
      }), err => reject(err.json())
  
  
    });
  }
  getCart(){
    return this.cartList;
  }
    
  }

