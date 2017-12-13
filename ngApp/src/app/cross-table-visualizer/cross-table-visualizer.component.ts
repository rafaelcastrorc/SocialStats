import { Component, OnInit, Input } from '@angular/core';
import { Country } from "../countryAWS";
import { HttpClient } from '@angular/common/http';

import {CountryService} from '../country.service';
import {ReligionService} from '../religion.service';
import {YearService} from '../year.service';
import {Religion} from '../religion';
import {Indicator} from '../Indicator';

@Component({
  selector: 'app-cross-table-visualizer',
  templateUrl: './cross-table-visualizer.component.html',
  styleUrls: ['./cross-table-visualizer.component.css'],
  providers: [CountryService, ReligionService, YearService]
})
export class CrossTableVisualizerComponent implements OnInit {
  @Input() query;
  indicators: Indicator[];
  countries: Country[];
  countriesReligion: Array<Country>;
  religions: Array<Religion>;
  yearsReligion: Array<String>;
  allIndicators: Array<Indicator>;

  constructor(
    private _countryService: CountryService, private _religionService: ReligionService, private _yearService: YearService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Indicator[]>('/api_aws/getIndicators')
      .subscribe(data => {
        this.indicators = data;
      });

    // Get indicators from world bank
    this.http.get<Indicator[]>('/api_world/allIndicators'
    ).subscribe(data => {
      this.allIndicators = data;
    });

    // Get data from religion server
    this._countryService.getCountries()
      .subscribe(resCountryData => this.countries = resCountryData);
    this._religionService.getReligions()
      .subscribe(resReligionData => this.religions = resReligionData);
    this._yearService.getYears()
      .subscribe(resYearData => this.yearsReligion = resYearData);
  }

}
