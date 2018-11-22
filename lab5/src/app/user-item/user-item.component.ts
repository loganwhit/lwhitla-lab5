import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  showCommentField;
  starRating;
  constructor(public thisDialogRef: MatDialogRef<UserItemComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { this.showCommentField=false;}
  ngOnInit() {
  }
  title = 'Rating';  
  starList: boolean[] = [true,true,true,true,true];       // create a list which contains status of 5 stars
  rating;  
  //Create a function which receives the value counting of stars click, 
  //and according to that value we do change the value of that star in list.
  setStar(data:any){
      this.rating=data+1;                               
      for(var i=0;i<=4;i++){  
        if(i<=data){  
          this.starList[i]=false;  
        }  
        else{  
          this.starList[i]=true;  
        }  
     }  
 }  
  addComment(){
    if(this.showCommentField==false){
      this.showCommentField=true;
    }
    else{
      this.showCommentField=false;
    }
  }
  
  submitComment(){
    
  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
 
}