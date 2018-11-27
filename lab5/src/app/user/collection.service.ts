import { Injectable } from '@angular/core';
import {AuthService} from '../core/auth.service';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { FirebaseUserModel } from '../core/user.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private collection;
  private counter;
 private userDetails;
 private user;
  
 
  
  
  constructor(private authService : AuthService, private afAuth: AngularFireAuth) {
    this.collection=authService.getAllUsers();
    this.user=afAuth.authState;
    this.user.subscribe( //https://itnext.io/step-by-step-complete-firebase-authentication-in-angular-2-97ca73b8eb32
        (user) => {
          if (user) {
            this.userDetails = user;
             this.counter=this.collection.doc(this.userDetails.uid).collection('Collections').get().then(snap => {
              this.counter = snap.size;
              });
            
            console.log(this.userDetails);
          }
          else {
            this.userDetails = null;
          }
        }
      );
   
    
  
    }
  getCollections(){
    var lists=[];
   var lists= this.collection.doc(this.userDetails.uid).collection('Collections');
   return lists;

  }
  
  addCollection(itemList, name, description, isPublic){
  
    
    
    // var user = firebase.auth().currentUser();
    this.collection.doc(this.userDetails.uid).collection('Collections').doc(this.counter.toString()).set({
  name: name,
  description: description,
  isPublic: isPublic
}, { merge: true })
.then(function(res){
  for(var i=0; i<itemList.length; i++){
  this.collection.doc(this.userDetails.uid).collection('Collections').doc(this.counter.toString()).collection('Items').doc(itemList[i]._id).set({
  quantity: itemList[i].quantity}, { merge: true })
  }
  this.counter++;
}.bind(this))
    
  }
}
