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

  namesTopTen: Array<string>;
  valuesTopTen = [];


  selectedIndicator = 'Select an Indicator';
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


  onSelectIndicator(indicator: string) {
    this.selectedIndicator = indicator;
    this.hasSelectedIndicator = true;
  }

  onSelectMode(mode: string) {
    this.selectedMode = mode;
    this.hasSelectedMode = true;
  }

  onSubmit() {
    if (this.hasSelectedYear && this.hasSelectedIndicator && this.hasSelectedMode) {
      this.graphChanged = false;
      this.barChartData = [];
      // Get data from world bank
      this.http.get<any[]>('/api_world/top10' + '/' + this.selectedIndicator + '/' + Number(this.selectedYear) + '/' + this.selectedMode
      ).subscribe(data => {
        let index;
        console.log(data);
        for (index = 0; index < data.length; index++) {
          this.namesTopTen.push((Object.values(data[index]))[0]);
          this.valuesTopTen.push((Object.values(data[index]))[1]);
        }

        // Get religion data at that year
        for (let i = 0; i < this.namesTopTen.length; i++) {
          this.http.get<number[]>('/api_religion/queries/numbers2' + '/' + this.namesTopTen[i] + '/' +
            'All Religions' + '/' + this.selectedYear)
            .subscribe(data2 => {
              this.barChartData.push({data: data2, label: this.namesTopTen[i]});
            });

        }
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
