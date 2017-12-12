import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'query-religion-wb',
  templateUrl: './query-religion-wb.component.html',
  styleUrls: ['./query-religion-wb.component.css']
})
export class QueryReligionWbComponent implements OnInit {
  @Input() countries;
  @Input() religions;
  @Input() years;

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
        names.push((Object.values(data[index]))[0]);
        values.push((Object.values(data[index]))[1]);
      }
    });
  }
}
