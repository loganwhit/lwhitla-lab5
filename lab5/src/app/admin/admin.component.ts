import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService} from './admin.service'
import {AuthService} from '../core/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addItem: FormGroup;
  constructor(private fb: FormBuilder,
  private router: Router,
  private adminServ : AdminService,
  private authService: AuthService) {
       this.createForm() }

  ngOnInit() {
  }
  createForm(){
    this.addItem = this.fb.group({
      name: ['', Validators.required ],
      quantity: ['',Validators.required],
      price: ['',Validators.required],
      tax: ['',Validators.required],
      amountSold: ['',Validators.required],
      descript:['',Validators.required]
    });
  }
  createItem(value){
    this.adminServ.addItem(value)
    .then(res => {
      console.log(res);
      
      
    }, err => {
      console.log(err);
    });
  }
  logout(){
    this.authService.doLogout()
    .then((res) => {
     
      this.router.navigate(['/start']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
