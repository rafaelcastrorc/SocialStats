import { Component, OnInit, Input } from '@angular/core';
import {Country} from '../../countryAWS';
import {HttpClient} from "@angular/common/http";

interface RawDataPacket {
  totalDeaths: number;
  latitude: number;
  longitude: number
}

@Component({
  selector: 'query-conflict-locations',
  templateUrl: './query-conflict-locations.component.html',
  styleUrls: ['./query-conflict-locations.component.css']
})
export class QueryConflictLocationsComponent implements OnInit {
  @Input() countries;
  selectedCountryName = 'Select a country';
  mapCenter = "0, 0"
  selectedCountryCode = '';
  displayAlert = false;
  queryLocations: RawDataPacket[];

  constructor(private http: HttpClient) { }

  onSelectCountry(country: Country) {
    this.selectedCountryName = country.name;
    this.selectedCountryCode = country.code;
    this.mapCenter = country.name;
    console.log(this.selectedCountryName, this.selectedCountryCode);
    this.onSubmit();
  }

  getRadius(numDeaths) {
    let radius = Math.min((Math.sqrt(numDeaths) * 1000), 30000);
    return radius;
  }

  formattedCoord(lat, long) {
    return {lat: lat, lng: long};
  }

  onSubmit() {
    this.http.get<RawDataPacket[]>('/api_aws/conflictLocation/' + this.selectedCountryCode
    ).subscribe(data => {
      this.queryLocations = data;
      if (this.queryLocations.length < 1) {
        this.displayAlert = true;
      } else {
        this.displayAlert = false;
      }
    });
  }

  dismissAlert() {
    this.displayAlert = false;
  }

  ngOnInit() {
  }

}
