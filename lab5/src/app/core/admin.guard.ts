import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private user;
  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router,
    private authService: AuthService){}
    
    //Protects a route from being activated if user is not a registered admin
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise<any>((resolve, reject) => {
      if ( this.authService.isLoggedIn() ) {
            this.user = this.userService.getCurrentUser()
              .then(function(res) {
                var docRef = this.authService.getUser(res);
                docRef.get().then(function(doc) {
                  var data = doc.data().isAdmin;
                  if(doc.data().isAdmin){
                    
                    resolve(true);
                  }
                  else{
              
                  this.router.navigate(['/user']);
                  resolve(false);
                  }
                  
              }.bind(this)).catch(function(error) {
                  console.log("Error getting document:", error);
              });
                
              }.bind(this)), err => {
                console.log(err);
              }
             
        }
        else{
        this.router.navigate(['/user']);
        resolve( false);
        }
        
      });
      }
        
    
  }

