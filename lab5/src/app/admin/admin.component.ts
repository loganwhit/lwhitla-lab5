import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService} from './admin.service'
import {AuthService} from '../core/auth.service'
import {Router} from '@angular/router';
import {UserService} from '../core/user.service';
import {StartService} from '../start/start.service';
import {PolicyService} from '../policy/policy.service';
import {DMCAService} from '../dmca/dmca.service';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import {ItemCommentService} from '../user-item/item-comment.service';


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
  policy;
  DMCA;
  updateItem:FormGroup;
  userReports;
  db;
  items;
  hiddenReports;
  
  

  constructor(private fb: FormBuilder,
  private userService: UserService,
  private router: Router,
  private adminServ : AdminService,
  private authService: AuthService,
  private startService : StartService,
  private polService : PolicyService,
  private DMCAService : DMCAService,
  private itemService :ItemCommentService) {
    this.items=[];
    this.getItems();
      this.users=[];
      this.userReports=[];
       this.createForm();
       this.setUsers();
       
       this.upItem=null;
       this.policy=polService.getPolicy();
       this.DMCA=DMCAService.getDMCA();
       
      this.db=firebase.firestore();
      //Gets all reports that have been filed
      this.db.collection("reports").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          //Stores the reports per item and comment number
          let data={id: doc.id,
          commentNumbers: doc.data()}
        this.userReports.push(data);
    }.bind(this));
    // console.log(this.userReports[0].commentNumbers);
}.bind(this));

       
       
       

  }
  //Returns all items in the database
  getItems(){
    this.startService.getAll()
       .then(res => {
      console.log(res);
      this.items=res;
    })
  }
  //Updates a selected item
  updateProduct(value){
    this.adminServ.updateItem(value, this.upItem._id)
    .then(res => {
      console.log(res);
      //Sets the chosen update item to null
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
  //Sets the editable policy to a policy from PolicyService
  setPolicy(policy){
    this.polService.setPolicy(policy);
    
  }
  //Sets DMCA to a DMCA from DMCAService
  setDMCA(DMCA){
    this.DMCAService.setDMCA(DMCA);
  }
  //Gets all users registered in firebase
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
  //Change admin status
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
  //Sets the update form
  updateForm(item){
    this.upItem=item;
    this.updateItem = this.fb.group({
      name: [item.name, Validators.required ],
      quantity: [item.quantity,Validators.required],
      price: [item.price,Validators.required],
      // tax: [item.tax,Validators.required],
      // amountSold: ['',Validators.required],
      descript:[item.descript,Validators.required]
    });
    
  }
  //Sets the create form
  createForm(){
    this.addItem = this.fb.group({
      name: ['', Validators.required ],
      quantity: ['',Validators.required],
      price: ['',Validators.required],
      //tax: ['',Validators.required],
      // amountSold: ['',Validators.required],
      descript:['',Validators.required]
    });
  }
  //Provides the ability to disable users
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
  //Creates an item in the database using AdminService
  createItem(value){
    this.adminServ.addItem(value)
    .then(res => {
      console.log(res);
      this.getItems();
      
      
    }, err => {
      console.log(err);
    });
  }
  //Deletes and item in the database using AdminService
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
  //Logs user out of site
  logout(){
    this.authService.doLogout()
    .then((res) => {
     
      this.router.navigate(['/start']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }
  //Gets a comment from an item ID and comment index
  getComment(id,num){
    for(var i=0; i<this.items.length; i++){
      if(this.items[i]._id==id){
        return this.items[i].comments[num];
      }
    }
  }
  //Hides a comment using an item ID and comment index
  hideComment(id,num){
    for(var i=0; i<this.items.length; i++){
      if(this.items[i]._id==id){
        this.itemService.hideItemComment(this.items[i],num);
      }
    }
    
  }
  //Gets whether an item is hidden or not
  getHidden(id,num){
    for(var i=0; i<this.items.length; i++){
      if(this.items[i]._id==id){
       return this.items[i].hidden[num];
      }
  }
  

}
//Shows a comment using an item ID and comment index
showComment(id,num){
    for(var i=0; i<this.items.length; i++){
      if(this.items[i]._id==id){
        this.itemService.showItemComment(this.items[i],num);
      }
    }
    
  }
}