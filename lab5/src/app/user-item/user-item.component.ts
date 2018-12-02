import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {ItemCommentService} from './item-comment.service'
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import {CartService} from '../cart/cart.service';
import {UserComponent} from '../user/user.component';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  showCommentField;
  numbers;
  firstFive;
  item;
  db;
  constructor(public thisDialogRef: MatDialogRef<UserItemComponent>, 
  @Inject(MAT_DIALOG_DATA) public data, 
  private commentService : ItemCommentService,
  private cartService : CartService) { 
    this.db=firebase.firestore();
    this.item=this.data.item;
    this.showCommentField=false;
    this.numbers = Array(this.item.comments.length).fill(1).map((x,i)=>i);
    if(this.numbers.length>5){
      this.firstFive=this.numbers.slice(0, 5);
    }
    else{
      this.firstFive=this.numbers;
    }
    
  }
  ngOnInit() {
  }
  reload(){
   
    this.numbers = Array(this.item.comments.length).fill(1).map((x,i)=>i);
    
    if(this.numbers.length>5){
      this.firstFive=this.numbers.slice(0, 5);
    }
    else{
      this.firstFive=this.numbers;
    }
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
  
  hideComment(index){
     this.commentService.hideItemComment(this.item,index)
    .then(res => {
      console.log(res);
      this.data.component.reload(this);
      //this.reload();
  }, err => {
      console.log(err);
    });
  }
  deleteComment(index){
    this.commentService.deleteItemComment(this.item,index)
    .then(res => {
      console.log(res);
      this.data.component.reload(this);
      //this.reload();
  }, err => {
      console.log(err);
    });
  }
  showComment(index){
    this.commentService.showItemComment(this.item,index)
    .then(res => {
      console.log(res);
      this.data.component.reload(this);
      //this.reload();
  }, err => {
      console.log(err);
    });
  }

  
  submitComment(comment){
   
    var user = firebase.auth().currentUser;
    if(comment!='' || this.rating!=undefined){
      if(confirm("Submit comment?")){
    this.commentService.addItemComment(this.item,comment,this.rating,user)
    .then(res => {
      console.log(res);
      this.data.component.reload(this);
      //this.reload();
  }, err => {
      console.log(err);
    });
      }
    }
    else{alert("Comment or rating must have a value");}
  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  // onCloseCancel() {
  //   this.thisDialogRef.close('Cancel');
  // }
  addCart(item, quant){
  this.cartService.addToCart(item,quant)
    .then(res => {
      console.log(res);
      this.data.component.reload();
  }, err => {
      console.log(err);
    });
  
}
  report(num, item){
  const settings = {timestampsInSnapshots: true};
  this.db.settings(settings);
  var collection = this.db.collection("reports");
  // collection("ItemReports").doc(num.toString())
  collection.doc(item._id).set({
      ['commentNumber'+num.toString()] : num},
      { merge: true })
        .then(function() {
            console.log("Document successfully written!");
           
        }.bind(this))
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    
  }
}
 
}
