import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Country} from '../../countryAWS';
import {HttpClient} from "@angular/common/http";

interface RawDataPacket {
  year: number;
  numConflicts: number;
}

// interface Country2 {
//   code: string;
//   name: string;
// }

@Component({
  selector: 'query-num-conflicts-in-country',
  templateUrl: './query-num-conflicts-in-country.component.html',
  styleUrls: ['./query-num-conflicts-in-country.component.css']
})
export class QueryNumConflictsInCountryComponent implements OnInit {
  @Input() countries;
  @Output() SelectCountry = new EventEmitter();
  selectedCountryName = 'Select a country';
  selectedCountryCode = '';
  hasSelectedCountry = false;
  displayAlert = false;
  queryConflictsCountry: RawDataPacket[];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  onSelectCountry(country: Country) {
    // if (country.name == null) {
    //   this.selectedCountry = 'All Countries';
    // } else {
      // Store the name of the country
    this.selectedCountryName = country.name;
    this.selectedCountryCode = country.code;
    // }
    console.log(this.selectedCountryName, this.selectedCountryCode);
    this.hasSelectedCountry = true;
    // this.SelectCountry.emit(country);
  }

  onSubmit() {
    if (this.hasSelectedCountry) {
      this.http.get<RawDataPacket[]>('/api_aws/conflictsPerYear/' + this.selectedCountryCode
      ).subscribe(data => {
        this.queryConflictsCountry = data;
        console.log(data);
      });
    } else {
      this.displayAlert = true;
    }
  }

  dismissAlert() {
    this.displayAlert = false;
  }

}
