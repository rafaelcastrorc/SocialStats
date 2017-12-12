import { Component, OnInit, Input, Output, NgModule } from '@angular/core';
// import {FormsModule} from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import {Country} from '../../countryAWS';
import {HttpClient} from "@angular/common/http";
import {query} from "@angular/animations";
// import { NguiMapModule} from '@ngui/map';
// import {ngMap} from "ngmap";

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
  // @Output() SelectCountry = new EventEmitter();
  selectedCountryName = 'Select a country';
  mapCenter = "0, 0"
  selectedCountryCode = '';
  // hasSelectedCountry = false;
  displayAlert = false;
  queryLocations: RawDataPacket[];
  // positions = [];

  constructor(private http: HttpClient) { }

  onSelectCountry(country: Country) {
    // if (country.name == null) {
    //   this.selectedCountry = 'All Countries';
    // } else {
    // Store the name of the country
    this.selectedCountryName = country.name;
    this.selectedCountryCode = country.code;
    this.mapCenter = country.name;
    // }
    console.log(this.selectedCountryName, this.selectedCountryCode);
    // this.hasSelectedCountry = true;
    this.onSubmit();
    // this.SelectCountry.emit(country);
  }

  getRadius(numDeaths) {
    let radius = Math.min((Math.sqrt(numDeaths) * 1000), 30000);
    // console.log(radius);
    return radius;
  }

  formattedCoord(lat, long) {
    // let coord =
    // formattedCoord[0] = lat.toString();
    // formattedCoord[1] = long.toString();
  //   if (lat < 0) {
  //     formattedCoord[0] = lat + " S";
  //   } else {
  //     formattedCoord[0] = lat + " N"
  //   }
  //
  //   if (long < 0) {
  //     formattedCoord[1] = long + " W"
  //   } else {
  //     formattedCoord[1] = long + " E"
  //   }
  //

    return {lat: lat, lng: long};
  }

  onSubmit() {
    this.http.get<RawDataPacket[]>('/api_aws/conflictLocation/' + this.selectedCountryCode
    ).subscribe(data => {
      this.queryLocations = data;
      // this.updateLocations();
      // console.log(data);
      if (this.queryLocations.length < 1) {
        this.displayAlert = true;
      } else {
        this.displayAlert = false;
      }
    });
  }


  // updateLocations() {
  //   this.positions = [];
  //   for (let q of this.queryLocations) {
  //     let latlong = {lat: q.latitude, lng: q.longitude}
  //     this.positions.push(latlong);
  //   }
  //   console.log(this.positions);
  // }

  dismissAlert() {
    this.displayAlert = false;
  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array
  }
  onIdle(event) {
    console.log('map', event.target);
  }
  onMarkerInit(marker) {
    console.log('marker', marker);
  }

  onMapClick(event) {
    //this.positions.push(event.latLng);
    event.target.panTo(event.latLng);
  }

  ngOnInit() {
  }

}
