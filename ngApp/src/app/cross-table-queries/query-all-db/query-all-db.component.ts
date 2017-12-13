import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface WorstConflictPacket {
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
  worstConflicts: WorstConflictPacket[];
  @Input() indicators;

  indicatorChanges = [];


  selectedIndicator = 'Select an Indicator';
  displayAlert = false;
  hasSelectedIndicator = false;

  updateTable = true;


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<WorstConflictPacket[]>('/api_aws/deadliestConflicts'
    ).subscribe(data => {
      this.worstConflicts = data;
      console.log(this.worstConflicts);
    });
  }


  onSelectIndicator(indicator: string) {
    this.selectedIndicator = indicator;
    this.hasSelectedIndicator = true;
  }

  onSubmit() {
    if (this.hasSelectedIndicator) {
      this.updateTable = false;
      for (let i = 0; i < this.worstConflicts.length; i++) {
        const d1 = new Date(this.worstConflicts[i].startDate);
        const d2 = new Date(this.worstConflicts[i].endDate);
        const start = d1.getFullYear();
        const end = d2.getFullYear();
        this.http.get<any[]>('/api_world/percentDifference' + '/' + this.worstConflicts[i].countryName + '/' + this.selectedIndicator
          + '/' +  start + '/' + end
        ).subscribe(data => {
          this.indicatorChanges.push(data[0].percent);
        });
      }
      this.updateTable = true;

    } else {
      this.displayAlert = true;
    }
  }

  dismissAlert() {
    this.displayAlert = false;
  }
}
