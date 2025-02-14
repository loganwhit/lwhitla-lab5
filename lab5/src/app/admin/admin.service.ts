import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = './api/items';
  public catalogList;

  constructor() {
    
    
  }
  //Service function for deleting an item from the database
  deleteItem(item){
    var deleteUrl = this.url+'/'+item._id;
    return new Promise<any>((resolve, reject) => {
      fetch(deleteUrl, {
        method: 'DELETE', 
      headers:{
        'Content-Type': 'application/json'
      }
      })
      .then((res) => {
        
        resolve(res.json());
        
      }), err => reject(err.json())
  
  
    })

  }
  //Service function for adding an item to the database
  addItem(value){
    
     let data = {
        name: value.name,
        price: value.price,
        tax: value.tax,
        quantity: value.quantity,
        descript: value.descript
    }
    return new Promise<any>((resolve, reject) => {
      fetch(this.url, {
        method: 'POST', 
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
      })
      .then((res) => {
        
        resolve(res.json());
        
      }), err => reject(err.json())
  
  
    })

  }
  //Service function for updating an item
  updateItem(value, id){
    var itemUrl = this.url+'/'+id;
     let data = {
        name: value.name,
        price: value.price,
        tax: value.tax,
        quantity: value.quantity,
        descript: value.descript
    }
    return new Promise<any>((resolve, reject) => {
      fetch(itemUrl, {
        method: 'PUT', 
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
      })
      .then((res) => {
        
        resolve(res.json());
        
      }), err => reject(err.json())
  
  
    });

  }
 

}
  

