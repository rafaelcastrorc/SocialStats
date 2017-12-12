import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cross-table',
  templateUrl: './cross-table.component.html',
  styleUrls: ['./cross-table.component.css']
})
export class CrossTableComponent implements OnInit {
  queries: String[] = [
    'Number of Conflicts compared to World Bank Indicators',
    'Conflict severity compared to World Bank Indicators'
  ];

  selectedQuery = 'Select a query from the right side panel';
  constructor() { }

  ngOnInit() {
  }

  onSelectQuery(query: string) {
    this.selectedQuery = query;
  }

}
