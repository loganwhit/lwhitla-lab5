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
//Firebase Auth Source
//https://github.com/AngularTemplates/firebase-authentication-with-angular-5

// https://angular-templates.io/tutorials/about/firebase-authentication-with-angular?fbclid=IwAR2BLHKp-FbK40yG9pTvU_96bgHduq10vmgHCM7FSVKbdEay8UYP8j7wcKs 
//Used for registering a user
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
  //Creates a form for registering a user with an email and a password
  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }
  
  //Registers a user 
  tryRegister(value,verPass){
   
    if (!(value.password==verPass)) //Checks to see if password matches the re-rentry
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
