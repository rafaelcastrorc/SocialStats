import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country} from '../../country';
import {BaseChartDirective} from 'ng2-charts';

interface Query4 {
  name: string;
  number: number;
}

@Component({
  selector: 'query-religion-percentage',
  templateUrl: './query-religion-percentage.component.html',
  styleUrls: ['./query-religion-percentage.component.css']
})
export class QueryReligionPercentageComponent implements OnInit {
  @Input() countries;
  @Input() years;
  @Output() SelectCountry = new EventEmitter();
  @Output() SelectYear = new EventEmitter();
  // Pie
  pieChartLabels = [];
  pieChartData = [0];
  pieChartType = 'pie';
  isDataAvailable = false;

  selectedCountryName = 'Select a Country';
  selectedYear = 'Select a Year';
  groupReligions = false;
  displayAlert = false;


  hasSelectedCountry = false;
  hasSelectedYear = false;
  queryResults: Query4[];


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
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
  }


  onSelectYear(year: string) {
    this.selectedYear = year;
    this.hasSelectedYear = true;
  }

  onSelectGroup(group: boolean) {
    this.groupReligions = group;
  }

  onSubmit() {
    if (this.hasSelectedYear && this.hasSelectedCountry) {
      this.isDataAvailable = false;
      this.http.get<Query4[]>('/api_religion/queries/percentage' + '/' + this.selectedCountryName + '/' + this.selectedYear + '/' +
        this.groupReligions
      ).subscribe(data => {
        this.queryResults = data;
        let labels = [];
        let values = [];
        for (const entry of this.queryResults) {
          values.push(entry.number);
          labels.push(entry.name);
        }
        // If there are no records
        if (values.length === 0) {
          values = [1];
          labels = ['No records'];
        }
        // Change labels
        this.pieChartLabels.length = 0;
        for (let i = 0; i < labels.length; i++) {
          this.pieChartLabels.push(labels[i]);
        }
        this.pieChartData = values;
        this.isDataAvailable = true;
      });
    } else {
      this.displayAlert = true;
    }
  }

  dismissAlert() {
    this.displayAlert = false;
  }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}
