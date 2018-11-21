import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = './api/items';

  constructor() { }
  
  addItem(value){
     let data = {
        name: value.name,
        price: value.price,
        tax: value.tax,
        quantity: value.quantity,
        itemsSold: value.amountSold
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
  

