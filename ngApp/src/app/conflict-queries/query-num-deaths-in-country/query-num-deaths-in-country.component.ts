import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Country} from '../../countryAWS';
import {HttpClient} from "@angular/common/http";

interface RawDataPacket {
  year: number;
  totalDeaths: number;
}

@Component({
  selector: 'query-num-deaths-in-country',
  templateUrl: './query-num-deaths-in-country.component.html',
  styleUrls: ['./query-num-deaths-in-country.component.css']
})
export class QueryNumDeathsInCountryComponent implements OnInit {
  @Input() countries;
  @Output() SelectCountry = new EventEmitter();
  selectedCountryName = 'Select a country';
  selectedCountryCode = '';
  hasSelectedCountry = false;
  displayAlert = false;
  queryDeathsCountry: RawDataPacket[];

  constructor(private http: HttpClient) { }

  onSelectCountry(country: Country) {

    this.selectedCountryName = country.name;
    this.selectedCountryCode = country.code;
    console.log(this.selectedCountryName, this.selectedCountryCode);
    this.hasSelectedCountry = true;

    // if (country.name == null) {
    //   this.selectedCountry = 'All Countries';
    // } else {
    //   // Store the name of the country
    //   this.selectedCountry = country.name;
    // }
    // console.log(this.selectedCountry);
    // this.hasSelectedCountry = true;
    // this.SelectCountry.emit(country);
  }

  onSubmit() {
    if (this.hasSelectedCountry) {
      this.http.get<RawDataPacket[]>('/api_aws/DeathsPerYear/' + this.selectedCountryCode
      ).subscribe(data => {
        this.queryDeathsCountry = data;
        console.log(data);
      });
    } else {
      this.displayAlert = true;
    }



  }

  dismissAlert() {
    this.displayAlert = false;
  }

  ngOnInit() {
  }

}
