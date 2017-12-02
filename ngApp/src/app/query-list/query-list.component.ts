import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.css'],
})


export class QueryListComponent implements OnInit {
  @Input() queries;
  @Output() SelectQuery = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSelect(query: String) {
    this.SelectQuery.emit(query);
  }
}
