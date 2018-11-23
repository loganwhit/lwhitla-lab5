import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user;
  private userDetails;

  constructor(
    public afAuth: AngularFireAuth
  ){
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
  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
  
        }).catch(function(error) {});
        this.doLogout();
      }, err => reject(err))
      
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
