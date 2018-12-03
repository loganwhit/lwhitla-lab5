import { Component, OnInit } from '@angular/core';

import { Router, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {UserService} from '../core/user.service';
import {AuthService} from '../core/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide =true;
  loginForm: FormGroup;
  verify;
  
  
  message='';
  constructor(public authService: AuthService,
  public userService : UserService,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
      this.verify=false;
     }

  ngOnInit() {
  }
  //Firebase Auth Sources
//   https://github.com/AngularTemplates/firebase-authentication-with-angular-5

// https://angular-templates.io/tutorials/about/firebase-authentication-with-angular?fbclid=IwAR2BLHKp-FbK40yG9pTvU_96bgHduq10vmgHCM7FSVKbdEay8UYP8j7wcKs 
  //Creates login form
  createForm(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }
  //Sends verification email
  verifyEmail(value){
    this.authService.doLogin(value, true).then(res => {
      alert("Verification email sent");
    });
  }
  //Logs user in
  login(value, undefined){
    if(value.email=="" || value.email==undefined){
      alert("Please enter an email address");
      return;
    }
      
    this.authService.doLogin(value, undefined)
    .then(res => {
      console.log(res);
      if(!res.user.emailVerified){ //If user is not email verified tells user to verify email
        this.message='Please verify your email address';
        this.verify=true;
        
        return;
      }
      //Sets display name to initial value
      if(res.user.displayName==null){
      var userName= value.email.substr(0, value.email.indexOf('@'));
      
      let data = {name:userName}

      this.userService.updateCurrentUser(data);
      }
     
      
      
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      //Tells user to contact store manager if email is disabled
      if(err.code=="auth/user-disabled"){
        this.message=err.message+" Please contact the store manager."
      }
      else{
        this.message=err.message;
      }
      
    })
  }

}
