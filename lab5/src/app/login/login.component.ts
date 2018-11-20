import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
