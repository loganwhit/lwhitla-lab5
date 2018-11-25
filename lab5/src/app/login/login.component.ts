import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
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
  
  message='';
  constructor(public authService: AuthService,
  public userService : UserService,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
     }

  ngOnInit() {
  }
  createForm(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }
  login(value){
    this.authService.doLogin(value)
    .then(res => {
      console.log(res);
      if(!res.user.emailVerified){
        this.message='Please verify your email address';
      }
      if(res.user.displayName==null){
      var userName= value.email.substr(0, value.email.indexOf('@'));
      
      let data = {name:userName}

      this.userService.updateCurrentUser(data);
      }
     
      
      
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      if(err.code=="auth/user-disabled"){
        this.message=err.message+" Please contact the store manager."
      }
      else{
        this.message=err.message;
      }
      
    })
  }

}
