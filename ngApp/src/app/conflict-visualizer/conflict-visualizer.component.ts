import { Component, OnInit, Input} from '@angular/core';
import {Country} from '../countryAWS';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-conflict-visualizer',
  templateUrl: './conflict-visualizer.component.html',
  styleUrls: ['./conflict-visualizer.component.css'],
})
export class ConflictVisualizerComponent implements OnInit {
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
