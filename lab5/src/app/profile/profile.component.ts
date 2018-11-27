import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import {CollectionService} from '../user/collection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  editList;
  listName;
  listDescription;
  listPublic;
  listItems;
  collections;
  collectionsData;

  constructor(public userService: UserService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private collectionService: CollectionService) {
      this.editList=false;
      this.listItems=[];
      this.collectionsData=[];
      this.collections= collectionService.getCollections();
      this.collections.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
       this.collectionsData.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
        }.bind(this));
    }.bind(this));
    }

  ngOnInit() {
    // if(this.userService.getCurrentUser()){
    //   this.router.navigate(['/login']);
    // }
    this.route.data.subscribe(routeData => {
    let data = routeData['data'];
    if (data) {
      this.user = data;
      this.createForm(this.user.name);
    }
  })
  }
  // isAdmin(){
  //   // if(this.userService.getCurrentUser())
  // }
  openCollection(list){
    this.editList=true;
    this.listName=list.name;
    this.listDescription=list.description;
    this.listPublic=list.isPublic;
    
  }
  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }
  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }
  // createCollection(id){
    
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