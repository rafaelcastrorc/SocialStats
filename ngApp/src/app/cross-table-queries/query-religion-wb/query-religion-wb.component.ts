import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Indicator {
  code: string;
  name: string;
  description: string;
}


@Component({
  selector: 'query-religion-wb',
  templateUrl: './query-religion-wb.component.html',
  styleUrls: ['./query-religion-wb.component.css']
})
export class QueryReligionWbComponent implements OnInit {
  @Input() countriesReligion;
  yearsReligion = [1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005];
  @Input() years;
  @Input() religions;
  @Input() indicators;

  namesTopTen = [];
  valuesTopTen = [];


  selectedIndicator = 'Select an Indicator';
  selectedIndicatorCode = '';

  selectedMode = 'Select a Mode';
  selectedYear = 'Select a Year';
  displayAlert = false;


  hasSelectedIndicator = false;
  hasSelectedYear = false;
  hasSelectedMode = false;

  thereAreRecords = false;

  // Bar chart
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [{data: [1], label: 'Select a Country'}];
  graphChanged = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  onSelectYear(year: string) {
    this.selectedYear = year;
    this.hasSelectedYear = true;
  }


  onSelectIndicator(indicator: Indicator) {
    this.selectedIndicator = indicator.name;
    this.hasSelectedIndicator = true;
    this.selectedIndicatorCode = indicator.code;
  }

  onSelectMode(mode: string) {
    this.selectedMode = mode;
    this.hasSelectedMode = true;
  }

  onSubmit1() {
    if (this.hasSelectedYear && this.hasSelectedIndicator && this.hasSelectedMode) {
      this.graphChanged = false;
      this.barChartData = [];
      this.barChartLabels = [];
      // Get data from world bank
      this.http.get<any[]>('/api_world/top10/' + this.selectedIndicatorCode + '/' + Number(this.selectedYear) + '/' + this.selectedMode
      ).subscribe(data => {
        let index;
        let names = [];
        let values = [];
        console.log(data);
        for (index = 0; index < data.length; index++) {
          names.push((Object.values(data[index]))[0]);
          values.push((Object.values(data[index]))[1]);
        }
        this.namesTopTen = names;
        this.valuesTopTen = values;

        // Get religion data at that year
        for (let i = 0; i < this.namesTopTen.length; i++) {
          this.http.get<number[]>('/api_religion/queries/numbers2' + '/' + this.namesTopTen[i] + '/' +
            'All Religions' + '/' + this.selectedYear)
            .subscribe(data2 => {
              this.barChartData.push({data: data2, label: this.namesTopTen[i]});
              this.barChartLabels.push(this.namesTopTen[i]);
            });

        }
        this.http.get<number[]>('/api_religion/queries/numbers2' + '/' + 'All Countries' + '/' +
          'All Religions' + '/' + this.selectedYear)
          .subscribe(data3 => {
            this.barChartData.push({data: data3, label: 'All Countries'});
            this.barChartLabels.push('All Countries');
          });
      });
      this.graphChanged = true;

    } else {
      this.displayAlert = true;
    }
  }

  dismissAlert() {
    this.displayAlert = false;
  }

  // events
  chartClicked(e: any) {
    console.log(e);
  }

  chartHovered(e: any) {
    console.log(e);
  }
}
