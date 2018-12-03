import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ){
  }
// Firebase Authentication sources used
//   https://github.com/AngularTemplates/firebase-authentication-with-angular-5

// https://angular-templates.io/tutorials/about/firebase-authentication-with-angular?fbclid=IwAR2BLHKp-FbK40yG9pTvU_96bgHduq10vmgHCM7FSVKbdEay8UYP8j7wcKs 
  //Returns current user logged in
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
//   disableUser(user){
//     return new Promise<any>((resolve, reject) => {
//       var uid = user.id;
//       firebase.auth().updateUser(uid, {
//       disabled: true
// }).then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     resolve(userRecord.toJSON())
//   })
//   .catch(function(error) {
//     reject (error);
//   });
    
//     })
//   }
}
