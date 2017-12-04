import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from '../country';



@Component({
  selector: 'app-worldbank',
  templateUrl: './worldbank.component.html',
  styleUrls: ['./worldbank.component.css']
})

// export class Query {
//   country: string;
//   indicator: string;
// }

export class WorldbankComponent implements OnInit {

  // @Input() countries;
  // @Output() SelectCountry = new EventEmitter();


  hasSelectedCountry = false;
  hasSelectedIndicator = false;

  // selectedCountryName = "Select a Country";
  // selectedIndicator = "Select an Indicator";

  // queryResults: Array<Query>;

  constructor() {
  }

  ngOnInit() {
  }

  // onSelectCountry(country: Country) {
  //   if (country.name == null) {
  //     this.selectedCountryName = 'All Countries';
  //   } else {
  //     // Store the name of the country
  //     this.selectedCountryName = country.name;
  //   }
  //   console.log(this.selectedCountryName);
  //   this.hasSelectedCountry = true;
  //   // this.SelectCountry.emit(country);
  // }
  //
  // onSelectIndicator(country: Country) {
  //   if (country.name == null) {
  //     this.selectedCountryName = 'All Indicators';
  //   } else {
  //     // Store the name of the country
  //     this.selectedCountryName = indicator.name;
  //   }
  //   console.log(this.selectedCountryName);
  //   this.hasSelectedCountry = true;
  //   // this.SelectCountry.emit(country);
  // }


  // onSubmit() {
  //   if (this.hasSelectedCountry && this.hasSelectedIndicator) {
  //     this._queriesService.getIndicatorForCountry(this.selectedCountryName, this.selectedIndicator)
  //       .subscribe(resQueryData => this.queryResults = resQueryData);
  //   }
  // }

}
