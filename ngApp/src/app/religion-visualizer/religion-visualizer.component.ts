import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from '../country';
import {DropdownModule} from 'ngx-dropdown';
import {Religion} from '../religion';
import {CountryService} from '../country.service';
import {ReligionService} from '../religion.service';
import {YearService} from '../year.service';

@Component({
  selector: 'religion-visualizer',
  templateUrl: './religion-visualizer.component.html',
  styleUrls: ['./religion-visualizer.component.css'],
  providers: [CountryService, ReligionService, YearService]
})
export class ReligionVisualizerComponent implements OnInit {
  countries: Array<Country>;
  religions: Array<Religion>;
  years: Array<String>;
  @Input() query;


  constructor(private _countryService: CountryService, private _religionService: ReligionService, private _yearService: YearService) {
  }

  ngOnInit() {
    // Subscribe to country service
    this._countryService.getCountries()
      .subscribe(resCountryData => this.countries = resCountryData);
    this._religionService.getReligions()
      .subscribe(resReligionData => this.religions = resReligionData);
    this._yearService.getYears()
      .subscribe(resYearData => this.years = resYearData);
  }


}
