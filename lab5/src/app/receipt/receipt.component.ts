import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {CartService} from '../cart/cart.service';
import {CartComponent} from '../cart/cart.component';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
//Upon buying items in cart receipt dialog opens up
  constructor(public thisDialogRef: MatDialogRef<ReceiptComponent>, 
  @Inject(MAT_DIALOG_DATA) public data, 
  private cartService : CartService) { }

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
