import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService} from './admin.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addItem: FormGroup;
  constructor(private fb: FormBuilder,
  private adminServ : AdminService) {
       this.createForm() }

  ngOnInit() {
  }
  createForm(){
    this.addItem = this.fb.group({
      name: ['', Validators.required ],
      quantity: ['',Validators.required],
      price: ['',Validators.required],
      tax: ['',Validators.required],
      amountSold: ['',Validators.required]
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

}
