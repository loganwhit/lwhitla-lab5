import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService} from './admin.service'
import {AuthService} from '../core/auth.service'
import {Router} from '@angular/router';
import {UserService} from '../core/user.service';
import {StartService} from '../start/start.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addItem: FormGroup;
  public collection;
  users;
  upItem;
  updateItem:FormGroup;
 private items;
  constructor(private fb: FormBuilder,
  private userService: UserService,
  private router: Router,
  private adminServ : AdminService,
  private authService: AuthService,
  private startService : StartService) {
      this.users=[];
       this.createForm();
       this.setUsers();
       this.getItems();
       this.upItem=null;
       
       

  }
  getItems(){
    this.startService.getAll()
       .then(res => {
      console.log(res);
      this.items=res;
    })
  }
  updateProduct(value){
    this.adminServ.updateItem(value, this.upItem._id)
    .then(res => {
      console.log(res);
      this.upItem=null;
      this.getItems();
      
      
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    // if(this.userService.getCurrentUser()){
    //   this.router.navigate(['/login']);
    // }
  }
  setUsers(){
    this.users=[];
    this.collection=this.authService.getAllUsers();
       this.collection.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          this.users.push(doc);
          console.log(doc);
        
        //console.log(doc.id, " => ", doc.data());
    }.bind(this));
}.bind(this));
  }
  changeStatus(user){
    if(user.data().isAdmin){
      this.collection.doc(user.id).set({
      isAdmin : false},
      { merge: true })
        .then(function() {
            console.log("Document successfully written!");
            this.setUsers();
        }.bind(this))
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    else{
      this.collection.doc(user.id).set({
      isAdmin : true},
      { merge: true })
        .then(function() {
            console.log("Document successfully written!");
            this.setUsers();
        }.bind(this))
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    
  }
  updateForm(item){
    this.upItem=item;
    this.updateItem = this.fb.group({
      name: [item.name, Validators.required ],
      quantity: [item.quantity,Validators.required],
      price: [item.price,Validators.required],
      tax: [item.tax,Validators.required],
      // amountSold: ['',Validators.required],
      descript:[item.descript,Validators.required]
    });
    
  }
  createForm(){
    this.addItem = this.fb.group({
      name: ['', Validators.required ],
      quantity: ['',Validators.required],
      price: ['',Validators.required],
      tax: ['',Validators.required],
      // amountSold: ['',Validators.required],
      descript:['',Validators.required]
    });
  }
  disableUser(user){
    if(user.data().active){
      this.collection.doc(user.id).set({
      active : false},
      { merge: true })
        .then(function() {
            console.log("Document successfully written!");
            this.setUsers();
        }.bind(this))
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    else{
      this.collection.doc(user.id).set({
      active : true},
      { merge: true })
        .then(function() {
            console.log("Document successfully written!");
            this.setUsers();
        }.bind(this))
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
  }
  createItem(value){
    this.adminServ.addItem(value)
    .then(res => {
      console.log(res);
      this.getItems();
      
      
    }, err => {
      console.log(err);
    });
  }
  deleteItem(item){
    if(confirm("Are you sure you want to delete "+item.name)){
    this.adminServ.deleteItem(item)
     .then(res => {
      console.log(res);
      this.getItems();
      
      
    }, err => {
      console.log(err);
    });
    }
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
