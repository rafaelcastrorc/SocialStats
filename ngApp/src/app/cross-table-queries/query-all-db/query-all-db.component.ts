import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface worstConflictPacket {
  countryName: string;
  startDate: any;
  endDate: any;
  totalDeaths: number;
}

@Component({
  selector: 'query-all-db',
  templateUrl: './query-all-db.component.html',
  styleUrls: ['./query-all-db.component.css']
})
export class QueryAllDbComponent implements OnInit {
  queryResponse: worstConflictPacket[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<worstConflictPacket[]>('/api_aws/deadliestConflicts'
    ).subscribe(data => {
      this.queryResponse = data;
      console.log(this.queryResponse);
    });
  }

}
