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
    'Religions present in the fewest countries',
    'Largest religion by country',
    'Christianity vs. Islam vs. Judaism',
    'Comparing religions between countries',
    'Religious vs. non Religious',
    'Most religious country per region',
    'Similar countries in terms of religions',
    'Percent of people who follow a religion in a country'
  ];
  selectedQuery = 'Select a query from the right side panel';


  constructor() {
  }

  ngOnInit() {
  }

  onSelectQuery(query: string) {
    this.selectedQuery = query;
    console.log(this.selectedQuery);
  }

}

