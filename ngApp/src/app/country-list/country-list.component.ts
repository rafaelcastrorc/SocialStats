import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})


export class CountryListComponent implements OnInit {
  @Input() countries;

  constructor() { }

  ngOnInit() {
  }

}
