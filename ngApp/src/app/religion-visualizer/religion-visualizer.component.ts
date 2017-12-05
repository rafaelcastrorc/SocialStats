import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from '../country';
import {DropdownModule} from 'ngx-dropdown';
import {Religion} from '../religion';
import {CountryService} from '../country.service';
import {ReligionService} from '../religion.service';
import {YearService} from '../year.service';
import {HttpClient} from '@angular/common/http';

interface PartOf {
  religion: string;
  partOf: string;
}

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
  partOfArr: Array<PartOf>;

  partOfText = 'learn more';
  showPartOf = false;
  @Input() query;


  constructor(private _countryService: CountryService, private _religionService: ReligionService, private _yearService: YearService,
              private http: HttpClient) {
  }

  ngOnInit() {
    // Get data that should be used by multiple components
    this._countryService.getCountries()
      .subscribe(resCountryData => this.countries = resCountryData);
    this._religionService.getReligions()
      .subscribe(resReligionData => this.religions = resReligionData);
    this._yearService.getYears()
      .subscribe(resYearData => this.years = resYearData);
    this.http.get<PartOf[]>('/api_religion/partof'
    ).subscribe(data => {
      this.partOfArr = data;
    });
  }

  partOfClick() {
    if (this.partOfText === 'learn more') {
      this.showPartOf = true;
      this.partOfText = 'hide';
    } else {
      this.partOfText = 'learn more';
      this.showPartOf = false;

    }


  }


}
