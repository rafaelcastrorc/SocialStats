import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'religion-list',
  templateUrl: './religion-list.component.html',
  styleUrls: ['./religion-list.component.css'],

})
export class ReligionListComponent implements OnInit, OnChanges {
  @Input() country;

  editTitle = false;

  constructor() {
  }

  ngOnInit() {
  }

  onNameClick() {
    this.editTitle = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editTitle = false;
  }
}
