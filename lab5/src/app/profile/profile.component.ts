import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import {CollectionService} from '../user/collection.service';
import {StartService} from '../start/start.service';

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
  itemCollection;
  itemArr;
  itemReferences;
  itemIDs;
  tempListId;
  addIt;
  remainderItems;
  itemIndices;
  isAdmin;

  constructor(public userService: UserService,
    
    private router: Router,
    public authService: AuthService,
   
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private startService : StartService,
    private collectionService: CollectionService) {
      this.addIt=false;
      this.itemIDs=[];
      this.itemArr=[];
      userService.getCurrentUser()
    .then(res => {
      var docRef = authService.getUser(res);
      
      docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
          
           this.isAdmin=doc.data().isAdmin;
        } else {
            authService.addUser(res);
            console.log("No such document!");
        }
    }.bind(this)).catch(function(error) {
        console.log("Error getting document:", error);
    });
    });
      //Gets all items and pushes item ids into their own array
      startService.getAll().then(function(res){
        for(var i=0; i<res.length; i++){
          this.itemIDs.push(res[i]._id);
          this.itemArr.push(res[i]);
        }
      }.bind(this))
      this.refreshCollections();
      
      this.editList=false;
      this.listItems=[];
      this.collectionsData=[];
      this.itemReferences=[];
      this.collections= collectionService.getCollections(null);
      
    }
    
    //User lists/collections are stored in firebase
    //The values stored are the item ids and quantities
    //The list of items from the Mongo database is used to fill in the remaining values
    
    //Firebase Auth Source
//https://github.com/AngularTemplates/firebase-authentication-with-angular-5

// https://angular-templates.io/tutorials/about/firebase-authentication-with-angular?fbclid=IwAR2BLHKp-FbK40yG9pTvU_96bgHduq10vmgHCM7FSVKbdEay8UYP8j7wcKs 
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
  
  //Opens a selected collection
  openCollection(list){
    
    this.tempListId=list.id;
    this.editList=true;
    this.refreshItems();
    
    
    this.listName=list.data().name;
    this.listDescription=list.data().description;
    this.listPublic=list.data().isPublic;
    
    
   
    
  }
  //Refreshes item array and item indicses
  refreshItems(){
    this.itemIndices=[];
    this.addIt=false;
    this.remainderItems=[];
    
     this.listItems=[];
   this.itemCollection=this.collectionService.getItems(this.tempListId, undefined);
    this.itemReferences=[];
    
     this.itemCollection.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
       this.itemReferences.push(doc);
      
        }.bind(this));
        for (var i=0; i<this.itemReferences.length; i++){
         var itemIndex= this.itemIDs.indexOf(this.itemReferences[i].id); 
          var item = this.itemArr[itemIndex];
          this.itemIndices.push(itemIndex);
        item.quantity=this.itemReferences[i].data().quantity;
        this.listItems.push(item);
        }
        
        
    }.bind(this));
    
  }
  //Refreshes collections
  refreshCollections(){
    this.collectionsData=[];
    this.collections=this.collectionService.getCollections(undefined);
    this.collections.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
       this.collectionsData.push(doc);
        // console.log(doc.id, " => ", doc.data());
        }.bind(this));
    }.bind(this));
  }
  //Creates form for entering user name
  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }
  //Saves user display name
  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }
  // createCollection(id){
    
  // }
  //Logs user out
  logout(){
    this.authService.doLogout()
    .then((res) => {
     
      this.router.navigate(['/start']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }
  //Removes item from list/collection
  removeItem(item){
    this.itemCollection.doc(item._id).delete().then(function() {
    console.log("Document successfully deleted!");
    this.refreshItems();
    }.bind(this)).catch(function(error) {
    console.error("Error removing document: ", error);
    });
  }
  //Opens select/option form for adding a new item to a collection/list
  addItem(){
    this.addIt=true;
    this.itemIndices.sort();
        var itemHold = JSON.stringify(this.itemArr);
        
        var temp=Array.from(JSON.parse(itemHold));
        
      for(var x=this.itemIndices.length-1; x>=0; x--){
        temp.splice(this.itemIndices[x],1);
      }
      this.remainderItems=temp;
    
    
  }
  //Adds an item from select/option to collection/list
  addCollectionItem(item){
    this.itemCollection.doc(item._id).set({
      quantity: "1"}, {merge: true}).then(function(res){
        this.refreshItems();
      }.bind(this))
  }
  //Saves list
  saveList(){
    
    
    this.collections.doc(this.tempListId).set({
      description: this.listDescription,
      name: this.listName,
      isPublic: this.listPublic}, {merge : true} )
      .then(function(res){
        for(var i=0; i<this.listItems.length; i++){
          this.collections.doc(this.tempListId).collection('Items').doc(this.listItems[i]._id).set({
          quantity: this.listItems[i].quantity }, {merge : true} ).then(function(res){
            console.log("Sucessfully Updated");
            this.addIt=false;
            this.refreshCollections();
          }.bind(this))
        }
      }.bind(this))
      
      
  }
  //Deletes a list
  deleteList(){
    if(!confirm("Do you wish to delete this list?")){
      return;
    }
    var listItemIDs=[];
    for(var i=0; i<this.itemReferences.length; i++){
   
      this.collections.doc(this.tempListId).collection('Items').doc(this.itemReferences[i].id).delete();
      
    }
    
    this.collections.doc(this.tempListId).delete().then(function() {
    console.log("Document successfully deleted!");
    this.refreshCollections();
    this.editList=false;
    this.listName='';
    this.listDescription='';
    this.listPublic=false;
    }.bind(this)).catch(function(error) {
    console.error("Error removing document: ", error);
    });
  }
}