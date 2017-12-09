import {Component, Input, OnInit} from '@angular/core';
import {ChartsModule} from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {Religion} from '../../religion';
import {Country} from '../../country';

@Component({
  selector: 'query-change-of-religion-over-time',
  templateUrl: './query-change-of-religion-over-time.component.html',
  styleUrls: ['./query-change-of-religion-over-time.component.css']
})
export class QueryChangeOfReligionOverTimeComponent implements OnInit {
  @Input() years: Array<string> = [];
  @Input() countries;
  @Input() religions;
  hasSelectedCountry = false;
  hasSelectedReligion = false;
  displayAlert = false;
  queryResults: number[];
  selectedCountryName = 'Select a Country';
  selectedReligionName = 'Select a Religion';
  selectedReligionName2 = 'Select another Religion';
  selectedReligionName3 = 'Select another Religion';


  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Number of people'
        }
      }]
    }

  };

  public lineChartData: Array<any> = [
    {data: [], label: 'Religion'},
    {data: [], label: 'Religion 2'},
    {data: [], label: 'Religion 3'},

  ];
  lineChartLabels = [];

  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.lineChartLabels = this.years;
  }

  onSubmit() {
    if (this.hasSelectedCountry && this.hasSelectedReligion) {


      this.http.get<number[]>('/api_religion/queries/numbers' + '/' + this.selectedCountryName + '/' +
        this.selectedReligionName
      ).subscribe(data => {
        this.queryResults = data;
        this.lineChartData = [
          {data: [], label: 'Religion'},
          {data: [], label: 'Religion 2'},
          {data: [], label: 'Religion 3'},

        ];
        this.lineChartData = [
          {data: this.queryResults, label: this.selectedReligionName},
          {data: [10000, 59, 80, 81, 56, 55, 30000], label: 'Series A'},
          {data: [10000, 59, 40, 19, 86, 300000, 30], label: 'Series B'},
        ];
      });


    } else {
      this.displayAlert = true;
    }
  }

  dismissAlert() {
    this.displayAlert = false;
  }

  onSelectCountry(country: Country) {
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


  onSelectReligion(religion: Religion) {
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

  // Handles click event on chart
  public chartClicked(e: any): void {
    if (e.active.length > 0) {
      const chartElement = e.active[0]._chart.getElementAtEvent(event);
      console.log(chartElement[0]._model.datasetLabel);
    }
  }

  public chartHovered(e: any): void {
    if (e.active.length > 0) {
      const chartElement = e.active[0]._chart.getElementAtEvent(event);
      console.log(chartElement[0]._model.datasetLabel);
    }
  }


}
