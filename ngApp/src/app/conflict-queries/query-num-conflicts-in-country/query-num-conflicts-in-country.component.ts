import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {Country} from '../../countryAWS';
import {HttpClient} from "@angular/common/http";
import {ChartsModule} from 'chart.js';

interface RawDataPacket {
  year: number;
  numConflicts: number;
}

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
  lineChartLabels = [];
  numConflicts = [];
  lineChartOptions = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Number of conflicts'
        }
      }]
    }
  };
  lineChartData = [{data: [], label:'Num Conflicts'}];
  lineChartType = 'line';
  displayChart = false;
  displayNoData = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSelectCountry(country: Country) {
    this.selectedCountryName = country.name;
    this.selectedCountryCode = country.code;
    // }
    console.log(this.selectedCountryName, this.selectedCountryCode);
    this.hasSelectedCountry = true;
  }

  onSubmit() {
    this.displayNoData = false;
    if (this.hasSelectedCountry) {
      this.displayChart = false;
      this.http.get<RawDataPacket[]>('/api_aws/conflictsPerYear/' + this.selectedCountryCode
      ).subscribe(data => {
        this.queryConflictsCountry = data;
        if (this.queryConflictsCountry.length < 1) {
          this.displayNoData = true;
        } else {
          this.formatGraphData(data);
        }
      });
    } else {
      this.displayAlert = true;
    }
  }

  formatGraphData(data) {
    this.lineChartLabels = [];
    this.numConflicts = [];
    for (let index = 0; index < data.length; index++) {
      this.lineChartLabels.push(data[index].year);
      this.numConflicts.push(data[index].numConflicts);
    }

    this.lineChartData[0].data = this.numConflicts;
    console.log(this.lineChartLabels, this.numConflicts);
    this.displayChart = true;
  }

  dismissAlert() {
    this.displayAlert = false;
  }

  dismissNoData() {
    this.displayNoData = false;
  }

}
