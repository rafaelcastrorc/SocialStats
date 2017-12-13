import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Indicator {
  code: string;
  name: string;
  description: string;
}

@Component({
  selector: 'query-religion-wb',
  templateUrl: './query-religion-wb.component.html',
  styleUrls: ['./query-religion-wb.component.css']
})
export class QueryReligionWbComponent implements OnInit {
  @Input() countriesReligion;
  @Input() yearsReligion;
  @Input() years;
  @Input() religion;
  @Input() indicators;

  namesTopTen = [];
  valuesTopTen = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  getTopTen(indicator: string, year: number, mode: string) {
    this.http.get<any[]>('/api_world/top' + '/' + indicator + '/' + year + '/' + mode
    ).subscribe(data => {
      let index;
      const names = [];
      const values = [];
      for (index = 0; index < data.length; index++) {
        this.namesTopTen.push((Object.values(data[index]))[0]);
        this.valuesTopTen.push((Object.values(data[index]))[1]);
      }
    });
  }
}
