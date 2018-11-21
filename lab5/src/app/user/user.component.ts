import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(public userService: UserService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder) { }

  ngOnInit() {
  //   this.route.data.subscribe(routeData => {
  //   let data = routeData['data'];
  //   if (data) {
  //     this.user = data;
  //     this.createForm(this.user.name);
  //   }
  // })
  }
  isAdmin(){
    // if(this.userService.getCurrentUser())
  }
  // createForm(name) {
  //   this.profileForm = this.fb.group({
  //     name: [name, Validators.required ]
  //   });
  // }
  // save(value){
  //   this.userService.updateCurrentUser(value)
  //   .then(res => {
  //     console.log(res);
  //   }, err => console.log(err))
  // }
  logout(){
    this.authService.doLogout()
    .then((res) => {
     
      this.router.navigate(['/start']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
