import { Component, OnInit } from '@angular/core';
import {PolicyService} from './policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
private policy;
//Similar to DMCA. Sets policy equal to policy from PolicyService
  constructor(private polService : PolicyService) {
    this.policy= this.polService.getPolicy();
    }

  ngOnInit() {
    
  }

}
