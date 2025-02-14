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
  
  //Adds user to firestore database
  addUser(userResp){

  
  const settings = {timestampsInSnapshots: true};
  this.db.settings(settings);
    var collection = this.db.collection("users");
    collection.doc(userResp.uid).set({
      isAdmin : false,
      email: userResp.email,
      displayName: userResp.displayName,
      active: true
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        
  }
  //Gets user properties from firestore database
  getUser(userResp){
    const settings = {timestampsInSnapshots: true};
  this.db.settings(settings);
  var collection = this.db.collection("users");
  return collection.doc(userResp.uid);
  
  }
  //Same thing as above except returns a promise
  getUserPromise(uid){
    return new Promise<any>((resolve, reject) => {
      const settings = {timestampsInSnapshots: true};
      this.db.settings(settings);
      var collection = this.db.collection("users");
      var userRef = collection.doc(uid);
      resolve(userRef);
      
      
    });
    
  }
  //Gets all users from firestore database
  getAllUsers(){
    const settings = {timestampsInSnapshots: true};
  this.db.settings(settings);
  var collection = this.db.collection("users");
  return collection;
  
  }
  //Registers a user in firebase authentication
//   https://github.com/AngularTemplates/firebase-authentication-with-angular-5

// https://angular-templates.io/tutorials/about/firebase-authentication-with-angular?fbclid=IwAR2BLHKp-FbK40yG9pTvU_96bgHduq10vmgHCM7FSVKbdEay8UYP8j7wcKs 
//Above sources were used for most of firebase authentication
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
      }) .catch(err => {reject(err)})


      
    })
  }
 //Checks to see if a user is logged in
  isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
//Logs the user in 
//Used same sources as doRegister
  doLogin(value, emailVer){
    emailVer = false || emailVer;
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
     
        var user=firebase.auth().currentUser;
           
        var resHold= res;
        if(emailVer){
          user.sendEmailVerification().then(function() {
            this.doLogout();
  
        }).catch(function(error) {});
        }
        
        if(!user.emailVerified){
          this.doLogout();
        }
        var ref = this.getUser(user);
        ref.get().then(function(res){
          
           if(res.exists){
            if(!(res.data().active)){ //Checks to see if a user is disabled
            alert("User is disabled. Please contact a manager");
            this.doLogout();
          }
          else{
            resolve(resHold);
          }
          
        }
        else{
          resolve(resHold);
        }
        }.bind(this)), err => reject(err)
       
        
      }, err => reject(err))
    })
  }
//Logs a user out
//Used same sources as doRegister and doLogin
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
