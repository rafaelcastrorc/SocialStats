import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from '../../country';
import {DropdownModule} from 'ngx-dropdown';
import {Religion} from '../../religion';
import {HttpClient} from '@angular/common/http';

interface Query1 {
  country: string;
  religion: string;
  year: string;
  number: string;
}

@Component({
  selector: 'query-number-of-followers',
  templateUrl: './query-number-of-followers.component.html',
  styleUrls: ['./query-number-of-followers.component.css'],

})
export class QueryNumberOfFollowersComponent implements OnInit {
  @Input() countries;
  @Input() religions;
  @Input() years;
  @Output() SelectCountry = new EventEmitter();
  @Output() SelectReligion = new EventEmitter();
  @Output() SelectYear = new EventEmitter();

  selectedCountryName = 'Select a Country';
  selectedReligionName = 'Select a Religion';
  selectedYear = 'Select a Year';
  displayAlert = false;


  hasSelectedCountry = false;
  hasSelectedReligion = false;
  hasSelectedYear = false;
  religion: Religion;
  queryResults: Query1[];


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  onSelectCountry(country: any) {
    if (country.name == null) {
      this.selectedCountryName = 'All Countries';
    } else {
      // Store the name of the country
      this.selectedCountryName = country.name;
    }
    console.log(this.selectedCountryName);
    this.hasSelectedCountry = true;
    // this.SelectCountry.emit(country);
  }


  onSelectReligion(religion: any) {
    if (religion.name == null) {
      this.selectedReligionName = 'All Religions';
    } else {
      // Store the name of the religion
      this.selectedReligionName = religion.name;
    }
    console.log(this.selectedReligionName);
    this.hasSelectedReligion = true;
    // this.SelectReligion.emit(religion);
  }

  onSelectYear(year: string) {
    if (year === 'All years') {
      this.selectedYear = 'All Years';
    } else {
      this.selectedYear = year;
    }
    this.hasSelectedYear = true;
  }

  onSubmit() {
    if (this.hasSelectedYear && this.hasSelectedCountry && this.hasSelectedReligion) {
      this.http.get<Query1[]>('/api_religion/queries/followers' + '/' + this.selectedCountryName + '/' + this.selectedYear + '/' +
        this.selectedReligionName
      ).subscribe(data => {
        this.queryResults = data;
      });
    } else {
      this.displayAlert = true;
    }
  }

  dismissAlert() {
    this.displayAlert = false;
  }
}


