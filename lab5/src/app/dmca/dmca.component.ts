import { Component, OnInit } from '@angular/core';
import {DMCAService} from './dmca.service';

@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.css']
})
export class DMCAComponent implements OnInit {
private DMCA;
  constructor(private dmcaService : DMCAService) {
    this.DMCA=this.dmcaService.getDMCA()}

  ngOnInit() {
  }

}
