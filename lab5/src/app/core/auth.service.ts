import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ){}
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

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        var user=firebase.auth().currentUser;
        resolve(res);
        if(!user.emailVerified){
          this.doLogout();
          alert('Please verify your email address');


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
