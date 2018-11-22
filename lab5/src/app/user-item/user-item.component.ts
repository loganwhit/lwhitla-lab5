import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {ItemCommentService} from './item-comment.service'
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  showCommentField;
  numbers;
  constructor(public thisDialogRef: MatDialogRef<UserItemComponent>, @Inject(MAT_DIALOG_DATA) public data, private commentService : ItemCommentService) { this.showCommentField=false;
    this.numbers = Array(this.data.item.comments.length).fill().map((x,i)=>i);
  }
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
  
  submitComment(comment){
   
    var user = firebase.auth().currentUser;
    this.commentService.addItemComment(this.data.item,comment,this.rating,user)
    .then(res => {
      console.log(res);
  }, err => {
      console.log(err);
    });
  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
 
}
