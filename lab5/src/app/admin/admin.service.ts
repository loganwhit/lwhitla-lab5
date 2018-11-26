import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = './api/items';
  public catalogList;

  constructor() {
    
    
  }
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
  
  addItem(value){
     let data = {
        name: value.name,
        price: value.price,
        tax: value.tax,
        quantity: value.quantity,
        itemsSold: value.amountSold,
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
 

}
  

