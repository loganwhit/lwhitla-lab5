import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {StartService} from '../start/start.service';
import {UserItemComponent} from '../user-item/user-item.component';
import {UserService} from '../core/user.service';
import {CartService} from '../cart/cart.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {CollectionService} from './collection.service';
import { AngularFireAuth } from '@angular/fire/auth';





@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private listDescription;
  private listName;
  private usersData;
  modalItem;
  dialogResult;
  items;
  private userDetails;
  private itemArr;
  private itemIDs;
  private tempArr;
  showMore;
  private user;
  private isAdmin;
  private collectionCreate;
  collectionItems;
  private setPublic;
  private userCollection;
  private userNames;
  collectionsLists;

  private listItems;
  private collectionProperties;
  private listOwner;
  private publicItems;
  private publicViewList;

  

  constructor(
    public dialog: MatDialog, private startServ: StartService,
    public afAuth: AngularFireAuth,
    private router: Router,
    public authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private cartService : CartService,
    private collectionsService: CollectionService) {
      this.itemIDs=[];
      this.publicViewList=false;
      
      this.setPublic=false;
      this.isAdmin=false;
      this.userCollection=authService.getAllUsers();
      
     
      
    this.collectionCreate=false;
    this.collectionItems=[];
    var context = this;
    
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
      
    }), err => {
      console.log(err);
    };
    
    this.showMore=false;
    this.itemArr=[];
    this.items=[];
   
    
    var unsortedItems;
    unsortedItems = this.startServ.getAll()
    .then(res => {
      console.log(res);
      for(var x in res){
      
      this.itemArr.push(res[x]);
      this.itemIDs.push(res[x]._id);
      
    }
    this.getPublicCollections();
    try{
      
    this.sortItems(this.itemArr);
    }
    catch(err){
      console.log(err);
    }
      
    }, err => {
      console.log(err);
    });
    //setInterval(this.reload.bind(this),5000);
    }

  ngOnInit() {
    // if(this.userService.getCurrentUser()){
    //   this.router.navigate(['/login']);
    // }

  }
  getPublicCollections(){
    this.usersData=[];
      this.collectionsLists=[];
      this.collectionProperties=[];
      this.listItems=[];
    this.userCollection.get().then(function(querySnapshot) { //https://firebase.google.com/docs/firestore/query-data/get-data
      querySnapshot.forEach(function(doc) {
       
        this.userCollection.doc(doc.id).collection('Collections').where("isPublic", "==", true)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc2) {
              
              this.userCollection.doc(doc.id).collection('Collections').doc(doc2.id).collection('Items').get().then(function(querySnapshot) {
                var listData = [];
                var tempItemList = JSON.stringify(this.itemArr);
                tempItemList=JSON.parse(tempItemList);
              querySnapshot.forEach(function(doc3) {
                 listData.push(doc3);
                 
                    }.bind(this));
                    this.listItems=[];
                     for (var i=0; i<listData.length; i++){
                       var itemIndex= this.itemIDs.indexOf(listData[i].id); 
                        var item = tempItemList[itemIndex];
                        //this.itemIndices.push(itemIndex);
                      item.quantity=listData[i].data().quantity;
                      this.listItems.push(item);
                      }
                    this.collectionsLists.push(this.listItems);
                    this.usersData.push(doc);
                    this.collectionProperties.push(doc2);
                    
                }.bind(this));
                
            }.bind(this));
        }.bind(this))
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
      
    }.bind(this));
}.bind(this));
  }
  addCollection(name, description, isPublic){
    this.collectionsService.addCollection(this.collectionItems,name, description, isPublic);
  }
  addToCollection(item, quantity){
   var holdItem = JSON.stringify(item);
    var tempItem = JSON.parse(holdItem);
    tempItem.quantity=quantity;
    this.collectionItems.push(tempItem);
  }
  createCollection(){
    this.collectionCreate=true;
  }
  
  reload(){
    var unsortedItems;
     this.itemIDs=[];
    this.tempArr=[];
    unsortedItems = this.startServ.getAll()
    .then(res => {
      console.log(res);
      for(var x in res){
        
      
      this.tempArr.push(res[x]);
      this.itemIDs.push(res[x]._id);
    }
    try{
      
    this.sortItems(this.tempArr);
    }
    catch(err){
      console.log(err);
    }
      
    }, err => {
      console.log(err);
    });
     
  }
  showOrHide(){
    if(this.showMore==true){
      this.showMore=false;
    }
    else{
      this.showMore=true;
    }
  }
  sortItems(itemList){
    
    itemList.sort(function(a,b){
     
      return parseInt(a.itemsSold)-parseInt(b.itemsSold);
    })
    itemList=itemList.reverse();
    if (this.itemArr==itemList && this.items.length!==0){
     return;
   }
   else{
    this.items=[];
    this.itemArr=itemList;
    for (var i=0; i<11&&i<itemList.length; i++){
      this.items.push(itemList[i]);
}
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
  openCollection(index){
    this.publicViewList=true;
    this.listName=this.collectionProperties[index].data().name;
    this.listDescription=this.collectionProperties[index].data().description;
    this.listOwner = this.usersData[index].data().displayName;
    this.publicItems = this.collectionsLists[index];
    
    
    
  }

  openDialog(item) {

    this.modalItem=item;
    let dialogRef = this.dialog.open(UserItemComponent, {
      width: '600px',
      data: {item : item, component: this}
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      // itemObs.unsubscribe();
    });
  

}
addCart(item, quant){
  this.cartService.addToCart(item,quant)
    .then(res => {
      console.log(res);
      this.reload();
  }, err => {
      console.log(err);
    });
  
}
}