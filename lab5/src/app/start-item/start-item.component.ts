import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-start-item',
  templateUrl: './start-item.component.html',
  styleUrls: ['./start-item.component.css']
})
export class StartItemComponent implements OnInit {
  constructor(public thisDialogRef: MatDialogRef<StartItemComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }
  ngOnInit() {
  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}