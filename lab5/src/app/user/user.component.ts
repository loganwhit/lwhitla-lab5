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
import {AuthService} from '../core/auth.service';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  modalItem;
  dialogResult;
  items;
  private itemArr;
  private tempArr;
  showMore;
  private user;
  

  constructor(
    public dialog: MatDialog, private startServ: StartService,
    private router: Router,
    public authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private cartService : CartService) {
    
    this.user = userService.getCurrentUser()
    .then(res => {
      var docRef = authService.getUser(res);
      docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            authService.addUser(res);
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
      
    }, err => {
      console.log(err);
    });
    
    this.showMore=false;
    this.itemArr=[];
    this.items=[];
    
    var unsortedItems;
    unsortedItems = this.startServ.getAll()
    .then(res => {
      console.log(res);
      for(var x in res){
        
      
      this.itemArr.push(res[x]);
    }
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
  reload(){
    var unsortedItems;
     
    this.tempArr=[];
    unsortedItems = this.startServ.getAll()
    .then(res => {
      console.log(res);
      for(var x in res){
        
      
      this.tempArr.push(res[x]);
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
  // observable = Observable;
  // observer = {
  //   next: (value) => {
      
  //     this.modalItem = value;
  //     this.modalItem$.next(value);
  //   }
  // }
  // subscription = this.observable.subscribe(this.observer);
  openDialog(item) {
    this.modalItem=item;
    let dialogRef = this.dialog.open(UserItemComponent, {
      width: '600px',
      data: {item : item,
        component: this
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
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