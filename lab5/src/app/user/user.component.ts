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



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  dialogResult;
  items;
  private itemArr;
  private tempArr;
  showMore;

  constructor(
    public dialog: MatDialog, private startServ: StartService,
    private router: Router,
    public authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private cartService : CartService) {
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
  // reload(){
  //   var unsortedItems;
     
  //   this.tempArr=[];
  //   unsortedItems = this.startServ.getAll()
  //   .then(res => {
  //     console.log(res);
  //     for(var x in res){
        
      
  //     this.tempArr.push(res[x]);
  //   }
  //   try{
      
  //   this.sortItems(this.tempArr);
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
      
  //   }, err => {
  //     console.log(err);
  //   });
     
  // }
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
  openDialog(item) {
    
    let dialogRef = this.dialog.open(UserItemComponent, {
      width: '600px',
      data: {item : item}
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
  }, err => {
      console.log(err);
    });
  
}
}