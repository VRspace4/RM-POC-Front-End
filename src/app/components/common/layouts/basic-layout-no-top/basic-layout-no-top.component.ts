import { Component, OnInit } from '@angular/core';
import { detectBody } from '../../../../app.helpers';

@Component({
  selector: 'app-basic-layout-no-top',
  templateUrl: './basic-layout-no-top.component.html',
  styleUrls: ['./basic-layout-no-top.component.css'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BasicLayoutNoTopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    detectBody();
  }

  onResize() {
    detectBody();
  }

}
