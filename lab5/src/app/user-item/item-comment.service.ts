import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ItemCommentService {
  
  
  
  url = './api/items/comment/';
  
  constructor() { }
  
  // setItem(item){
  //   this.item=item;
  // }
  // getItem(){
  //   return this.item;
  // }
  addItemComment(item,comment, rating,user){
    var id =item._id;
    var itemUrl = this.url+id;
    var dName = user.displayName;
    
    let data={
        comment: comment,
        rating: rating,
        user: dName
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
  
  
    })
  }
  hideItemComment(item,index){
    var id =item._id;
    var itemUrl = this.url+'hide/'+id;
    
    
    let data={
        index: index
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
  
  
    })
  }
  deleteItemComment(item,index){
     var id =item._id;
    var itemUrl = this.url+'delete/'+id;
    
    
    let data={
        index: index
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
  
  
    })
  }
  showItemComment(item,index){
    var id =item._id;
    var itemUrl = this.url+'unhide/'+id;
    
    
    let data={
        index: index
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
  
  
    })
  }
}
