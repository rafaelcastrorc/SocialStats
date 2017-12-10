import { Component, OnInit } from '@angular/core';
import {CountryService} from '../country.service';

@Component({
  selector: 'app-conflict',
  templateUrl: './conflict.component.html',
  styleUrls: ['./conflict.component.css'],
  providers: [CountryService]
})
export class ConflictComponent implements OnInit {
  queries: String[] = [
    'Number of conflicts in a country per year',
    'Number of deaths in a country per year',
    'Show conflicts in a country on a map'
  ];
  selectedQuery = 'Select a query from the right side panel';
  constructor() { }

  ngOnInit() {
  }

  onSelectQuery(query: string) {
    this.selectedQuery = query;
    console.log(this.selectedQuery);
  }

}
