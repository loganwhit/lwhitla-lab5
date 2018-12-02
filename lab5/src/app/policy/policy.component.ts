import { Component, OnInit } from '@angular/core';
import {PolicyService} from './policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
private policy;

  constructor(private polService : PolicyService) {
    this.policy= this.polService.getPolicy();
    }

  ngOnInit() {
    
  }

}
