import { Component, OnInit, Input } from '@angular/core';
import {Indicator} from '../../indicator';
import {HttpClient} from "@angular/common/http";

interface RawDataPacket {
  country_code: string;
  numConflicts: number;
  indicatorVal: number;
}

@Component({
  selector: 'query-num-deaths-indicator',
  templateUrl: './query-num-deaths-indicator.component.html',
  styleUrls: ['./query-num-deaths-indicator.component.css']
})
export class QueryNumDeathsIndicatorComponent implements OnInit {
  @Input() indicators;
  @Input() years;
  // selectedCountryName = 'Select a country';
  selectedIndicatorName = 'Select an indicator';
  selectedIndicator: Indicator;
  selectedYear = 'Select a year';
  hasSelectedIndicator = false;
  hasSelectedYear = false;
  displayAlert = false;
  queryResponse: RawDataPacket[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSelectIndicator(indicator: Indicator) {
    this.selectedIndicatorName = indicator.name;
    this.selectedIndicator = indicator;
    this.hasSelectedIndicator = true;
  }

  onSelectYear(year) {
    this.selectedYear = year;
    this.hasSelectedYear = true;
  }

  onSubmit() {
    if (this.hasSelectedYear && this.hasSelectedIndicator) {
      this.http.get<RawDataPacket[]>('/api_aws/numDeathsAndIndicator/' +
        this.selectedIndicator.code + '/' + this.selectedYear
      ).subscribe(data => {
        this.queryResponse = data;
        console.log(this.queryResponse);
      });
    } else {
      this.displayAlert = true;
    }
  }

  dismissAlert() {
    this.displayAlert = false;
  }

}
