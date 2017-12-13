import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Country} from '../../countryAWS';
import {HttpClient} from "@angular/common/http";
import {ChartsModule} from 'chart.js';


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
  lineChartLabels = [];
  numDeaths = [];
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
          labelString: 'Number of deaths due to conflicts'
        }
      }]
    }
  };
  lineChartData = [{data: [], label:'Num Deaths'}];
  lineChartType = 'line';
  displayChart = false;
  displayNoData = false;

  constructor(private http: HttpClient) { }

  onSelectCountry(country: Country) {

    this.selectedCountryName = country.name;
    this.selectedCountryCode = country.code;
    console.log(this.selectedCountryName, this.selectedCountryCode);
    this.hasSelectedCountry = true;
  }

  onSubmit() {
    this.displayNoData = false;
    if (this.hasSelectedCountry) {
      this.displayChart = false;
      this.http.get<RawDataPacket[]>('/api_aws/DeathsPerYear/' + this.selectedCountryCode
      ).subscribe(data => {
        this.queryDeathsCountry = data;
        if (this.queryDeathsCountry.length < 1) {
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
    this.numDeaths = [];
    for (let index = 0; index < data.length; index++) {
      this.lineChartLabels.push(data[index].year);
      this.numDeaths.push(data[index].totalDeaths);
    }

    this.lineChartData[0].data = this.numDeaths;
    // console.log(this.lineChartLabels, this.numDeaths);
    this.displayChart = true;
  }

  dismissAlert() {
    this.displayAlert = false;
  }

  dismissNoData() {
    this.displayNoData = false;
  }

  ngOnInit() {
  }

}
