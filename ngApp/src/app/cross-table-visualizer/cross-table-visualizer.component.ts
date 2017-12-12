import { Component, OnInit, Input } from '@angular/core';
import { Country } from "../countryAWS";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cross-table-visualizer',
  templateUrl: './cross-table-visualizer.component.html',
  styleUrls: ['./cross-table-visualizer.component.css']
})
export class CrossTableVisualizerComponent implements OnInit {
  @Input() query;
  countries: Country[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Country[]>('/api_aws/getCountries')
      .subscribe(data => {
        this.countries = data;
      });
  }

}
