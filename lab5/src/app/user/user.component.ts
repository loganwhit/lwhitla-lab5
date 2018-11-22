import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {StartService} from '../start/start.service';
import {UserItemComponent} from '../user-item/user-item.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  
  items;
  private itemArr;
  showMore;

  constructor(
    public dialog: MatDialog, private startServ: StartService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder) {
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
    }

  ngOnInit() {

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
    this.itemArr=itemList;
    for (var i=0; i<11&&i<itemList.length; i++){
      this.items.push(itemList[i]);

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
      data: {name: item.name,
        descript: item.descript,
        comments: item.comments,
        ratings: item.ratings,
        users: item.users,
        price: item.price,
        quantity: item.quantity
        
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });

}
