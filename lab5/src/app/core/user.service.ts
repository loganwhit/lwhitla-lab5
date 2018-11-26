import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import * as admin from 'firebase-admin';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ){
  }
  
  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject(false);
        }
      })
    })
  }
  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
  disableUser(user){
    return new Promise<any>((resolve, reject) => {
      var uid = user.id;
      firebase.auth().updateUser(uid, {
      disabled: true
}).then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    resolve(userRecord.toJSON())
  })
  .catch(function(error) {
    reject (error);
  });
    
    })
  }
}
