import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-start-item',
  templateUrl: './start-item.component.html',
  styleUrls: ['./start-item.component.css']
})
export class StartItemComponent implements OnInit {
  numbers;
  firstFive;
  constructor(public thisDialogRef: MatDialogRef<StartItemComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.numbers = Array(this.data.item.comments.length).fill(1).map((x,i)=>i);
    if(this.numbers.length>5){
      this.firstFive=this.numbers.slice(this.numbers.length-5, this.numbers,length);
    }
    else{
      this.firstFive=this.numbers;
    }
    
  }
  ngOnInit() {
  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}