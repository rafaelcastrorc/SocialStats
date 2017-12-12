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
    if (this.hasSelectedCountry && (this.hasSelectedReligion1 || this.hasSelectedReligion2 || this.hasSelectedReligion3 )) {
      // Fill in the data for the religion chosen
      if (this.hasSelectedReligion1 && this.religion1Changed) {
        this.http.get<number[]>('/api_religion/queries/numbers' + '/' + this.selectedCountryName + '/' +
          this.selectedReligionName
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
      if (this.hasSelectedReligion2 && this.religion2Changed) {
        // Check if there is another chosen religion
        this.http.get<number[]>('/api_religion/queries/numbers' + '/' + this.selectedCountryName + '/' +
          this.selectedReligionName2
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
      if (this.hasSelectedReligion3 && this.religion3Changed) {
        // Check if there is another chosen religion
        this.http.get<number[]>('/api_religion/queries/numbers' + '/' + this.selectedCountryName + '/' +
          this.selectedReligionName3
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
