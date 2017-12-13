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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Indicator[]>('/api_aws/getIndicators')
      .subscribe(data => {
        this.indicators = data;
      });
  }

}
