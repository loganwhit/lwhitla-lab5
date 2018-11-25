import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// import { AngularFireDatabase, FirebaseListObservable } from '@angular/fire/database';
// class User {
//     constructor(public uid, public isAdmin) { }
// }
export interface User { uid: string, isAdmin: boolean }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user;
  private userDetails;
  private collection;
  public db;

  // public usersDB: FirebaseListObservable<Users[]>;

  constructor(
    public afAuth: AngularFireAuth,
    // public db: AngularFireDatabase
    
  ){
    this.db=firebase.firestore();
    // this.usersDB=db.list('/users');
    this.user= afAuth.authState;
    
   
    this.user.subscribe( //https://itnext.io/step-by-step-complete-firebase-authentication-in-angular-2-97ca73b8eb32
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          }
          else {
            this.userDetails = null;
          }
        }
      );
  }
  // public AddUser(uid): void {
  //       let isAdmin = false;
  //       let newUser = new User(uid,isAdmin);
  //       this.usersDB.push(newUser);
  //   }
  addUser(userResp){

  
  const settings = {timestampsInSnapshots: true};
  this.db.settings(settings);
    var collection = this.db.collection("users");
    collection.doc(userResp.user.uid).set({
      isAdmin : false
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        
  }
  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
      
        
        // this.addUser(res);
       
        
        resolve(res);
        
          
        
        
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
  
        }).catch(function(error) {});
        this.doLogout();
        // this.AddUser(user.uid);
      }), err => reject(err)


      
    })
  }
  isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        var user=firebase.auth().currentUser;
        resolve(res);
        if(!user.emailVerified){
          this.doLogout();
          


        }
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      
      if(firebase.auth().currentUser){
        
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }
}
