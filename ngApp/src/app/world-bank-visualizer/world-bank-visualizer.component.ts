import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  allIndicators: Indicator[];
  allCountries: Country[];
  country_1: Country;
  indicator_1: Indicator;
  query1: Query1[];

  constructor(private http: HttpClient) { }

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
    this.http.get<Query1[]>('/api_world/query1' + '/' + this.country_1.code + '/' + this.indicator_1.code
    ).subscribe(data => {
      this.query1 = data;
    });
  }
}
