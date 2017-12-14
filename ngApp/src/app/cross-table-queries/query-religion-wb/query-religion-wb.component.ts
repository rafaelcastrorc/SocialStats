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
    scaleShowValues: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          autoSkip: false
        }
      }]
    }

  };

  colorsC = [
    'rgba(255, 99, 132, 0.4)',
    'rgba(54, 162, 235, 0.4)',
    'rgba(255, 206, 86, 0.4)',
    'rgba(75, 192, 192, 0.4)',
    'rgba(153, 102, 255, 0.4)',
    'rgba(255, 159, 64, 0.4)',
    'rgba(200, 60, 192, 0.4)',
    'rgba(255, 206, 86, 0.4)',
    'rgba(20, 206, 100, 0.4)',
    'rgba(60, 50, 100, 0.6)',
    'rgba(20, 40, 50, 0.6)',
  ];

  barChartLabels: string[] = ['Select a Country'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [{
    data: [1], label: 'Religiosity Percentage',
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)']
  }];
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
      this.barChartData = [];
      this.barChartLabels = [];


      // Get data from world bank
      this.http.get<any[]>('/api_world/top10' + '/' + this.selectedIndicatorCode + '/' + Number(this.selectedYear) + '/' + this.selectedMode
      ).subscribe(data => {
        this.graphChanged = false;
        const namesTemp = [];
        const valuesTemp = [];
        let index;
        for (index = 0; index < data.length; index++) {
          namesTemp.push((Object.values(data[index]))[0]);
          valuesTemp.push((Object.values(data[index]))[1]);
        }

        const array = [];
        // Get religion data at that year
        for (let i = 0; i < namesTemp.length; i++) {

          this.http.get<number[]>('/api_religion/queries/numbers2' + '/' + namesTemp[i] + '/' +
            'All Religions' + '/' + this.selectedYear)
            .subscribe(data2 => {
              const indexToUse = (parseInt(this.selectedYear, 10) - 1945) / 5;
              array.push(data2[indexToUse]);
              this.barChartLabels.push(namesTemp[i]);
            });

        }

        this.http.get<number[]>('/api_religion/queries/numbers2' + '/' + 'All Countries' + '/' +
          'All Religions' + '/' + this.selectedYear)
          .subscribe(data3 => {

            // Get the average of all of them
            let numOfNon0 = 0;
            let sum = 0;
            for (let i = 0; i < array.length; i++ ) {
              if (array[i] !== 0) {
                numOfNon0++;
              }
              sum = sum + array[i];

            }
            console.log(numOfNon0);

            const total = sum / numOfNon0;
            array.push(total.toFixed(2));

            this.barChartLabels.push('Average');

            const indexToUse = (parseInt(this.selectedYear, 10) - 1945) / 5;
            this.barChartLabels.push('All Countries');

            array.push(data3[indexToUse]);
            const obj = {
              data: array, label: 'Religiosity Percentage Per Country', backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)',
                'rgba(200, 60, 192, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(20, 206, 100, 0.4)',
                'rgba(60, 50, 100, 0.6)',
                'rgba(20, 40, 50, 0.6)',
              ]
            };
            this.barChartData.push(obj);
            this.graphChanged = true;

          });

      });

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
