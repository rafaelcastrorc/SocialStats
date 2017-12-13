import { Component, OnInit, Input } from '@angular/core';
import {Indicator} from '../../indicator';
import {HttpClient} from "@angular/common/http";
import {ChartsModule} from 'chart.js';


interface RawDataPacket {
  country_code: string;
  numConflicts: number;
  indicatorVal: number;
}

@Component({
  selector: 'query-num-conflicts-indicator',
  templateUrl: './query-num-conflicts-indicator.component.html',
  styleUrls: ['./query-num-conflicts-indicator.component.css']
})

export class QueryNumConflictsIndicatorComponent implements OnInit {
  @Input() indicators;
  years: number[] = [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
    1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
    2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
  // selectedCountryName = 'Select a country';
  selectedIndicatorName = 'Select an indicator';
  selectedIndicator: Indicator;
  selectedYear = 'Select a year';
  hasSelectedIndicator = false;
  hasSelectedYear = false;
  displayAlert = false;
  queryResponse: RawDataPacket[];
  // numConflicts = [];
  scatterOptions = {};
  scatterChartData = [];
  displayChart = false;
  displayNoData = false;

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
    this.displayNoData = false;
    if (this.hasSelectedYear && this.hasSelectedIndicator) {
      this.displayChart = false;
      this.http.get<RawDataPacket[]>('/api_aws/numConflictsAndIndicator/' +
        this.selectedIndicator.code + '/' + this.selectedYear
      ).subscribe(data => {
        this.queryResponse = data;
        if (this.queryResponse.length < 1) {
          this.displayNoData = true;
        } else {
          this.formatGraphData(this.queryResponse);
        }
        console.log(this.queryResponse);
      });
    } else {
      this.displayAlert = true;
    }
  }

  formatGraphData(q) {
    this.scatterChartData = [];
    for (let index = 0; index < q.length; index++) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let color = 'rgba(' + r + ', ' + g + ', ' + b +', 0.5)';
      let countryData = {'data': [{'x': q[index].indicatorVal, 'y': q[index].numConflicts}],
        'label': q[index].country_code,
        'borderColor' : color,
        'backgroundColor' : color,
        'pointBackgroundColor': color,
        'pointBorderColor' : color
      };
      // console.log(countryData);
      this.scatterChartData.push(countryData);
      // this.scatterChartData[index].label = data.country_code;
      // this.lineChartLabels.push(data[index].indicatorVal);
      // this.numConflicts.push(data[index].numConflicts);
    }

    // this.lineChartData[0].data = this.numConflicts;
    // console.log(this.lineChartLabels, this.numConflicts);
    console.log('ScatterChartData', this.scatterChartData);

    // TODO: figure out how to display country code in tooltip
    this.scatterOptions = {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 20
        }
      },
      responsive: true,
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label;
          }
        }
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: this.selectedIndicatorName
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Number of conflicts'
          }
        }]
      },
      multiTooltipTemplate: "<%=datasetLabel%> : <%=value%>",
    };
    this.displayChart = true;
  }

  dismissAlert() {
    this.displayAlert = false;
  }

  dismissNoData() {
    this.displayNoData = false;
  }

}
