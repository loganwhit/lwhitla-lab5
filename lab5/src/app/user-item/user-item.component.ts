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
//Source for modals
// https://medium.com/codingthesmartway-com-blog/angular-material-part-2-popups-modals-1ed0c2405f18
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
  //Refreshes dialog
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
  //Create a function which receives the value counting of stars clicked, 
  //According to that value we change the value of the star in the starList.
  setStar(data:any){ //https://www.c-sharpcorner.com/article/star-rating-in-angular-5/     Used for implementing star based ratings
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
 //Opens up the area for submitting comments
  addComment(){
    if(this.showCommentField==false){
      this.showCommentField=true;
    }
    else{
      this.showCommentField=false;
    }
  }
  //Hides a comment - only accesible by an admin
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
  //Deletes a comment - only accessible by an admin
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
  //Show comment - only accessible by an admin
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

  //User can submit a comment
  submitComment(comment){
   
    var user = firebase.auth().currentUser;
    if(comment!='' || this.rating!=undefined){ //Comment and rating most not both be undefined/empty
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
  //Closes dialog
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  // onCloseCancel() {
  //   this.thisDialogRef.close('Cancel');
  // }
  //Adds an item to cart
  addCart(item, quant){
  this.cartService.addToCart(item,quant)
    .then(res => {
      console.log(res);
      this.data.component.reload();
  }, err => {
      console.log(err);
    });
  
}
//User can report innapropriate and against DMCA comments
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
 

