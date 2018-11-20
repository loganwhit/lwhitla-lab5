import { Component, OnInit } from '@angular/core';
import {StartService} from './start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  private items;
  private itemArr;

  constructor(private startServ: StartService) {
    this.itemArr=[];
    var unsortedItems;
    unsortedItems = this.startServ.getAll()
    .then(res => {
      console.log(res);
      return JSON.parse(res);
      
    }, err => {
      console.log(err);
    })
    for(var x in unsortedItems){
      this.itemArr.push(unsortedItems[x]);
    }
    this.items=this.sortItems(this.itemArr);
   }

  ngOnInit() {
  }
  sortItems(itemList){
    
    itemList.sort(function(a,b){
      return parseInt(a.itemsSold)-parseInt(b.itemsSold);
    });
    for (var i=0; i<11; i++){
      this.items.push(itemList[i]);

    }

  }


}
