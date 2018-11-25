import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface User { uid: string, isAdmin: boolean }
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {
  // private userDoc: AngularFirestoreDocument<User>;
  // items: Observable<any[]>;
  hide=true;
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  verify='';
  

  constructor( 
  public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    ) {this.createForm();
    // this.collection=db.collection('users');
    
    
     }

  ngOnInit() {
  }
  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }
  
  
  tryRegister(value,verPass){
   
    if (!(value.password==verPass))
    {
      alert("Please make sure passwords match");
      return;
    }
    
    this.authService.doRegister(value)
    .then(res => {
      // this.authService.addUser(res);
     
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.verify='Please verify your email';
      // this.authService.addUser(res)
      // .then(res => {
      //   console.log(res);
      //   ),err => {
      //     console.log(err);
      //   }
        
      // console.log(res);
      
     
      
    
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      alert(this.errorMessage);
      this.successMessage = "";
    })
    
    
  }

}
