import {Component, OnInit} from '@angular/core';
import {Country} from '../country';
import {CountryService} from '../country.service';
import {Religion} from '../religion';
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

  countries: Array<Country>;
  religions: Array<Religion>;

  selectedQuery: String;


  constructor(private _countryService: CountryService, private _religionService: ReligionService) {
  }

  ngOnInit() {
    // Subscribe to country service
    this._countryService.getCountries()
      .subscribe(resCountryData => this.countries = resCountryData);
    this._religionService.getReligions()
      .subscribe(resReligionData => this.religions = resReligionData);
  }

  onSelectQuery(query: String) {
    this.selectedQuery = query;
    console.log(this.selectedQuery);
  }

}

