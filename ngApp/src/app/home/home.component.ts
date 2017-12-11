import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseChartDirective, ChartsModule} from 'ng2-charts';

interface Country {
  name: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allCountries: Country[];
  country: Country;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Country[]>('/api_world/allCountriesDesc'
    ).subscribe(data => {
      this.allCountries = data;
    });
  }

  onSelectCountry(country: Country) {
    this.country = country;
  }

}
