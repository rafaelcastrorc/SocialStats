import { Component, OnInit, Input } from '@angular/core';
// import { Country } from "../countryAWS";
import {Indicator} from '../indicator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cross-table-visualizer',
  templateUrl: './cross-table-visualizer.component.html',
  styleUrls: ['./cross-table-visualizer.component.css']
})
export class CrossTableVisualizerComponent implements OnInit {
  @Input() query;
  indicators: Indicator[];
  years: number[] = [1970, 1971, 1972, 1973, 1974, 1975, 2000, 2001, 2002, 2003, 2004];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Indicator[]>('/api_aws/getIndicators')
      .subscribe(data => {
        this.indicators = data;
      });
  }

}
