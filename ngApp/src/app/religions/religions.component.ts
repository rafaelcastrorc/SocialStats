import {Component, OnInit} from '@angular/core';
import {CountryService} from '../country.service';
import {ReligionService} from '../religion.service';

@Component({
  selector: 'app-religions',
  templateUrl: './religions.component.html',
  styleUrls: ['./religions.component.css'],
  providers: [CountryService, ReligionService]
})

export class ReligionsComponent implements OnInit {
  queries: String[] = [
    'Number of people who follow a religion in a country',
    'Most popular religions'];
  selectedQuery: String;


  constructor() {
  }

  ngOnInit() {
  }

  onSelectQuery(query: String) {
    this.selectedQuery = query;
    console.log(this.selectedQuery);
  }

}

