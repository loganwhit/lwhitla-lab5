import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {ItemCommentService} from '../user-item/item-comment.service'
@Component({
  selector: 'app-start-item',
  templateUrl: './start-item.component.html',
  styleUrls: ['./start-item.component.css']
})
export class StartItemComponent implements OnInit {
  numbers;
  firstFive;
  constructor(public thisDialogRef: MatDialogRef<StartItemComponent>, @Inject(MAT_DIALOG_DATA) public data, private commentService : ItemCommentService) {
    this.numbers = Array(this.data.item.comments.length).fill(1).map((x,i)=>i); //Gets an array of numbers equivalent to the number of comments
    if(this.numbers.length>5){ 
      this.firstFive=this.numbers.slice(0, 5); //If numbers is larger than five it gets the first five numbers of the array
    }
    else{
      this.firstFive=this.numbers;
    }
    
  }
  ngOnInit() {
  }
//Closes the dialog
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  // onCloseCancel() {
  //   this.thisDialogRef.close('Cancel');
  // }
}