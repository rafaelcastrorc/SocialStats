import { Component, OnInit, Input } from '@angular/core';
import {Country} from '../../countryAWS';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'query-num-conflicts-indicator',
  templateUrl: './query-num-conflicts-indicator.component.html',
  styleUrls: ['./query-num-conflicts-indicator.component.css']
})

export class QueryNumConflictsIndicatorComponent implements OnInit {
  @Input() countries;
  selectedCountryName = 'Select a country';

  constructor() { }

  ngOnInit() {
  }

}
