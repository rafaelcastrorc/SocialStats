import { Component, OnInit, Input, Output} from '@angular/core';
import {Country} from '../countryAWS';
// import {CountryService} from '../country.service';
// import {YearService} from '../year.service';
import {HttpClient} from '@angular/common/http';
import {ReligionService} from "../religion.service";
//
// interface Country2 {
//   code: string;
//   name: string;
// }

@Component({
  selector: 'app-conflict-visualizer',
  templateUrl: './conflict-visualizer.component.html',
  styleUrls: ['./conflict-visualizer.component.css'],
  // providers: [CountryService, YearService]
  // providers: [CountryService]
})
export class ConflictVisualizerComponent implements OnInit {
  // years: Array<String>;
  // partOfArr: Array<PartOf>;
  @Input() query;
  countries: Country[];

  // constructor(private _countryService: CountryService, private _yearService: YearService, private http: HttpClient) { }
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Country[]>('/api_aws/getCountries')
      .subscribe(data => {
      this.countries = data;
    });

    // this._countryService.getCountries()
    //   .subscribe(resCountryData => this.countries = resCountryData);
    // this._yearService.getYears()
    //   .subscribe(resYearData => this.years = resYearData);
  }

}
