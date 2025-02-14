import { Component, OnInit } from '@angular/core';
import {StartService} from './start.service';
import {MatDialog} from '@angular/material/dialog';
import {StartItemComponent} from '../start-item/start-item.component'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  
  
})
export class StartComponent implements OnInit {
  items;
  private itemArr;
  showMore;
  dialogResult;
  private tempArr;
  

  constructor(public dialog: MatDialog, private startServ: StartService) {
    this.showMore=false;
    this.itemArr=[];
    this.items=[];
    var unsortedItems;
    unsortedItems = this.startServ.getAll() //Gets all items
    .then(res => {
      console.log(res);
      for(var x in res){
        
      
      this.itemArr.push(res[x]); //Pushes items to itemArr
    }
    try{
      
    this.sortItems(this.itemArr); //Sorts items by number of items sold
    }
    catch(err){
      console.log(err);
    }
      
    }, err => {
      console.log(err);
    });
    // setInterval(this.reload.bind(this),5000);
    
   }
   //Refreshes itemArr
   reload(){ 
     var unsortedItems;
    
     this.tempArr=[];
    unsortedItems = this.startServ.getAll()
    .then(res => {
      console.log(res);
      for(var x in res){
        
      
      this.tempArr.push(res[x]);
    }
    try{
      
    this.sortItems(this.tempArr);
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
  //Selects whether to show all items or just the most popular 10
  showOrHide(){
    if(this.showMore==true){
      this.showMore=false;
    }
    else{
      this.showMore=true;
    }
  }
  //Sorts items by items sold
  sortItems(itemList){
    
    itemList.sort(function(a,b){
     
      return parseInt(a.itemsSold)-parseInt(b.itemsSold);
    })
    itemList=itemList.reverse();
    if (this.itemArr==itemList && this.items.length!==0){
     return;
   }
   else{
   this.items=[];
    this.itemArr=itemList;
    for (var i=0; i<10&&i<itemList.length; i++){
      this.items.push(itemList[i]);
    }

    }

  }
  //Opens a dialog with item descriptions and comments
  openDialog(item) {
    
    let dialogRef = this.dialog.open(StartItemComponent, {
      width: '600px',
      data: {item: item,
        component: this
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });


}
}
