import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
  //  Firebase Authentication sources used
//   https://github.com/AngularTemplates/firebase-authentication-with-angular-5

// https://angular-templates.io/tutorials/about/firebase-authentication-with-angular?fbclid=IwAR2BLHKp-FbK40yG9pTvU_96bgHduq10vmgHCM7FSVKbdEay8UYP8j7wcKs 
export class AuthGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router,
    private authService: AuthService
    
  ) {}
  //Checks to see if user is logged in
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { //https://itnext.io/step-by-step-complete-firebase-authentication-in-angular-2-97ca73b8eb32
   
        if ( this.authService.isLoggedIn() ) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    
      }
      // return new Promise((resolve, reject) => {
      //   this.userService.getCurrentUser()
      //   .then(user => {
      //     return resolve(false);
      //   }, err => {
      //   this.router.navigate['/login'];
      //     return resolve(true);
      //   })
      // })
  
}
