import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {
//Used for retrieving data on user profile
//Also functions as a route guard
//Firebase Auth Source
//https://github.com/AngularTemplates/firebase-authentication-with-angular-5

// https://angular-templates.io/tutorials/about/firebase-authentication-with-angular?fbclid=IwAR2BLHKp-FbK40yG9pTvU_96bgHduq10vmgHCM7FSVKbdEay8UYP8j7wcKs 
  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        if(res.providerData[0].providerId == 'password'){
          user.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        }
        else{
          user.image = res.photoURL;
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        }
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}