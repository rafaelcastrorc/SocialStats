import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseChartDirective, ChartsModule} from 'ng2-charts';

interface Indicator {
  code: string;
  name: string;
}

interface Country {
  code: string;
  name: string;
}

interface Query1 {
  y2000: number; y2001: number; y2002: number; y2003: number; y2004: number; y2005: number;
}

@Component({
  selector: 'app-world-bank-visualizer',
  templateUrl: './world-bank-visualizer.component.html',
  styleUrls: ['./world-bank-visualizer.component.css']
})

export class WorldBankVisualizerComponent implements OnInit {
  @Input() current: string;
  @ViewChild('baseChart') chart: BaseChartDirective;

  allIndicators: Indicator[];
  allCountries: Country[];
  country_1: Country;
  indicator_1: Indicator;
  query1: Query1[];
  temp1: number;
  graphdata1: number[] = [1, 2, null, null, 1, 2];
  labels1: string[] = ['y2000', 'y2001', 'y2002', 'y2003', 'y2004', 'y2005'];
  barChartData1: any[] = [{data: this.graphdata1, label: 'Series A'}];
  barChartType = 'bar';
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Country[]>('/api_world/allCountries'
    ).subscribe(data => {
      this.allCountries = data;
    });
    this.http.get<Indicator[]>('/api_world/allIndicators'
    ).subscribe(data => {
      this.allIndicators = data;
    });
  }

  onSubmitAllIndicators() {
    this.http.get<Indicator[]>('/api_world/allIndicators'
    ).subscribe(data => {
      this.allIndicators = data;
    });
  }

  onSelectCountry_1(country: Country) {
    if (country.code != null) {
      this.country_1 = country;
    }
  }

  onSelectIndicator_1(indicator: Indicator) {
    if (indicator.code != null) {
      this.indicator_1 = indicator;
    }
  }

  onSubmit_1() {
    // this.graphdata1 = [1, 1, 1, 1, 1, 1];
    this.http.get<Query1[]>('/api_world/query1' + '/' + this.country_1.code + '/' + this.indicator_1.code
    ).subscribe(data => {
      this.query1 = data;
      // for (var key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     this.graphdata1.push(data[key]);
      //     // ...
      //   }
      // }
      this.graphdata1 = Object.values(data[0]);
      this.barChartData1 = [{data: this.graphdata1, label: 'Series A'}];
    });
  }
}
