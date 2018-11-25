import { Component } from '@angular/core';
import * as firebase from 'firebase/app';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // const firestore = firebase.firestore();
  // const settings = {timestampsInSnapshots: true};
  // firestore.settings(settings);
  title = "Welcome to Log's Goods";
 
}
