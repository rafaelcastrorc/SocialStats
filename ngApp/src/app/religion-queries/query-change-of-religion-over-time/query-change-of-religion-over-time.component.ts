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
  hasSelectedReligion1 = false;
  hasSelectedReligion2 = false;
  hasSelectedReligion3 = false;
  // The user clicked the checkbox
  hasShownPercentageChange = true;
  // Deals with displaying the graph
  graphHasChanged = false;
  showPercentage = 'no';

  // Keeps track if the user is searching for a different religion
  religion1Changed = false;
  religion2Changed = false;
  religion3Changed = false;


  displayAlert = false;
  queryResults = [];
  queryResults2 = [];
  queryResults3 = [];

  selectedCountryName = 'Select a Country';
  selectedReligionName = 'Select a Religion';
  selectedReligionName2 = 'Select another Religion';
  selectedReligionName3 = 'Select another Religion';

  lineChartOptions;
  lineChartLabels = [];
  lineChartData = [];
  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.lineChartLabels = this.years;
    this.lineChartData = [
      {data: [], label: 'Religion 1'},
      {data: [], label: 'Religion 2'},
      {data: [], label: 'Religion 3'},

    ];
  }

  onSubmit() {
    let url = '';
    // Check if user wants to see percentage
    if (this.showPercentage === 'no') {
      url = '/api_religion/queries/numbers';
    } else {
      url = '/api_religion/queries/numbers2';
    }
    if (this.hasSelectedCountry && (this.hasSelectedReligion1 || this.hasSelectedReligion2 || this.hasSelectedReligion3 )) {
      // Check if we are displaying percentages to reload table
      if (this.hasShownPercentageChange) {
        if (this.showPercentage === 'no') {
          this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of people',
                }
              }]
            }
          };
        } else {
          this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Percentage of people (out of 100)',
                }
              }]
            }
          };
        }
        this.graphHasChanged = false;
      }
      // Fill in the data for the religion chosen
      if ((this.hasSelectedReligion1 && this.religion1Changed) || this.hasShownPercentageChange) {
        this.http.get<number[]>(url + '/' + this.selectedCountryName + '/' +
          this.selectedReligionName + '/all'
        ).subscribe(data => {
          this.queryResults = data;
          this.lineChartData = [
            {data: this.queryResults, label: this.selectedReligionName},
            {data: this.queryResults2, label: this.selectedReligionName2},
            {data: this.queryResults3, label: this.selectedReligionName3},
          ];
        });
        this.religion1Changed = false;
      }
      if ((this.hasSelectedReligion2 && this.religion2Changed) || this.hasShownPercentageChange) {
        // Check if there is another chosen religion
        this.http.get<number[]>(url + '/' + this.selectedCountryName + '/' +
          this.selectedReligionName2 + '/all'
        ).subscribe(data => {
          this.queryResults2 = data;
          this.lineChartData = [
            {data: this.queryResults, label: this.selectedReligionName},
            {data: this.queryResults2, label: this.selectedReligionName2},
            {data: this.queryResults3, label: this.selectedReligionName3},
          ];
        });
        this.religion2Changed = false;

      }
      if ((this.hasSelectedReligion3 && this.religion3Changed) || this.hasShownPercentageChange) {
        // Check if there is another chosen religion
        this.http.get<number[]>(url + '/' + this.selectedCountryName + '/' +
          this.selectedReligionName3 + '/all'
        ).subscribe(data => {
          this.queryResults3 = data;
          this.lineChartData = [
            {data: this.queryResults, label: this.selectedReligionName},
            {data: this.queryResults2, label: this.selectedReligionName2},
            {data: this.queryResults3, label: this.selectedReligionName3},
          ];
        });
        this.religion3Changed = false;

      }
      this.hasShownPercentageChange = false;
      // Keep canvas drawn
      this.graphHasChanged = true;

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
    this.hasSelectedCountry = true;
    // Change all the religions since the country changed
    this.religion1Changed = true;
    this.religion2Changed = true;
    this.religion3Changed = true;

  }


  onSelectReligion1(religion: Religion) {
    if (religion.name == null) {
      this.selectedReligionName = 'All Religions';
    } else {
      // Store the name of the religion
      this.selectedReligionName = religion.name;
    }
    console.log(this.selectedReligionName);
    this.hasSelectedReligion1 = true;
    this.religion1Changed = true;
  }

  onSelectReligion2(religion: Religion) {
    if (religion.name == null) {
      this.selectedReligionName2 = 'All Religions';
    } else {
      this.selectedReligionName2 = religion.name;
    }
    this.hasSelectedReligion2 = true;
    this.religion2Changed = true;

  }

  onSelectReligion3(religion: Religion) {
    if (religion.name == null) {
      this.selectedReligionName3 = 'All Religions';
    } else {
      this.selectedReligionName3 = religion.name;
    }
    this.hasSelectedReligion3 = true;
    this.religion3Changed = true;
  }

  // Handles click event to display percentages instead of number of people
  onSelectPercentage() {
    if (this.showPercentage === 'yes') {
      this.showPercentage = 'no';
    } else {
      this.showPercentage = 'yes';
    }
    this.hasShownPercentageChange = true;
    this.graphHasChanged = true;
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
