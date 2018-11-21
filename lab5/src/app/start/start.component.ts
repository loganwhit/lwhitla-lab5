import { Component, OnInit } from '@angular/core';
import {StartService} from './start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  
})
export class StartComponent implements OnInit {
  items;
  private itemArr;

  constructor(private startServ: StartService) {
    this.itemArr=[];
    this.items=[];
    var unsortedItems;
    unsortedItems = this.startServ.getAll()
    .then(res => {
      console.log(res);
      for(var x in res){
        
      
      this.itemArr.push(res[x]);
    }
    try{
      
    this.sortItems(this.itemArr);
    }
    catch(err){
      console.log(err);
    }
      
    }, err => {
      console.log(err);
    });
    
    
   }

  ngOnInit() {
  }
  sortItems(itemList){
    
    itemList.sort(function(a,b){
     
      return parseInt(a.itemsSold)-parseInt(b.itemsSold);
    })
    itemList=itemList.reverse();
    for (var i=0; i<11&&i<itemList.length; i++){
      this.items.push(itemList[i]);

    }

  }


}
