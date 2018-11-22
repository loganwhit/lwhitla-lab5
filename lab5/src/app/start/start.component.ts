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
  

  constructor(public dialog: MatDialog, private startServ: StartService) {
    this.showMore=false;
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
  showOrHide(){
    if(this.showMore==true){
      this.showMore=false;
    }
    else{
      this.showMore=true;
    }
  }
  sortItems(itemList){
    
    itemList.sort(function(a,b){
     
      return parseInt(a.itemsSold)-parseInt(b.itemsSold);
    })
    itemList=itemList.reverse();
    this.itemArr=itemList;
    for (var i=0; i<11&&i<itemList.length; i++){
      this.items.push(itemList[i]);

    }

  }
  openDialog(item) {
    
    let dialogRef = this.dialog.open(StartItemComponent, {
      width: '600px',
      data: {item: item
        
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });


}
}
