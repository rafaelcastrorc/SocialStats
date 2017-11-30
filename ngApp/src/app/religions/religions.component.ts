import { Component, OnInit } from '@angular/core';
import {Country} from '../country';

@Component({
  selector: 'app-religions',
  templateUrl: './religions.component.html',
  styleUrls: ['./religions.component.css']
})
export class ReligionsComponent implements OnInit {

  countries: Country[] = [
    { 'name': 'United States of America', 'id': '20', 'abbrev': 'usa'},
    { 'name': 'Canada', 'id': '0', 'abbrev': 'ca'}

  ];
  constructor() { }

  ngOnInit() {
  }

}
