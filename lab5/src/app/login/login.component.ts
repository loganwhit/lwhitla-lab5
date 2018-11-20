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
  errorMessage: string = '';
  verify='';
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
      if(!res.user.emailVerified){
        this.verify='Please verify your email address';

      }
      
      this.router.navigate(['/user']);
    }, err => {
      alert('Please register for an account');
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
