import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  private url = './api/items';

  constructor() { }

  getAll(){
    return new Promise<any>((resolve, reject) => {
      fetch(this.url)
      .then((res) => {
        
        resolve(res.json());
        
      }), err => reject(err.json())
  
  
    })

  }

}
