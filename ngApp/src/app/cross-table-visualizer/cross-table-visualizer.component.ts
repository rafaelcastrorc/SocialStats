import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Religion} from '../religion';
import {Indicator} from '../Indicator';
import {Country} from '../country';

@Component({
  selector: 'app-cross-table-visualizer',
  templateUrl: './cross-table-visualizer.component.html',
  styleUrls: ['./cross-table-visualizer.component.css']
})
export class CrossTableVisualizerComponent implements OnInit {
  @Input() query;
  countries: Country[];
  countriesReligion: Array<Country>;
  religions: Array<Religion>;
  yearsReligion: Array<String>;
  allIndicators: Array<Indicator>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Country[]>('/api_aws/getCountries')
      .subscribe(data => {
        this.countries = data;
      });

    // Get indicators from world bank
    this.http.get<Indicator[]>('/api_world/allIndicators'
    ).subscribe(data => {
      this.allIndicators = data;
    });

    // Get data from religion server
    this.http.get<Country[]>('/api_religion/countries'
    ).subscribe(data => {
      this.countriesReligion = data;
    });
    this.http.get<Religion[]>('/api_religion/religions'
    ).subscribe(data => {
      this.religions = data;
    });
    this.http.get<String[]>('/api_religion/years'
    ).subscribe(data => {
      this.yearsReligion = data;
    });
  }
}
