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
    return new Promise<any>((resolve, reject) => {
    var trigger = false;
    var holdItem = JSON.stringify(item);
    var tempItem = JSON.parse(holdItem);
    // item.quantity=itemQuantity-quant;
    var itemQuantity;
    this.catalogList= this.startServ.getAll().then(function(res){
      
   
    for (var x=0; x<res.length; x++){
      if(tempItem._id == res[x]._id){
        itemQuantity=res[x].quantity;
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
   
    
    
      
      fetch(itemUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
        'Content-Type': 'application/json'
  }})
      .then((res) => {
        
        resolve(res.json());
        this.getCatalogList();
        
      }.bind(this)), err => reject(err.json())
  
    }.bind(this))
    });
  
    
  }
 
  getCatalogList(){
    this.catalogList=this.startServ.getAll().then(res => {
      console.log(res);
    })
  }
  addToCart(item,quant){
    
    var trigger = false;
    var holdItem = JSON.stringify(item);
    var tempItem = JSON.parse(holdItem);
    
    // var itemQuantity;
    // for (var x=0; x<this.catalogList.length; x++){
   
    //   if(tempItem._id == this.catalogList[x]._id){
    //     itemQuantity=this.catalogList[x].quantity;
    //   }
    // }
    if(quant>item.quantity){
      alert("Quantity must be smaller or equal to quantity remaining");
      return;
    }
    item.quantity-=parseInt(quant);
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

