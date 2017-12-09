import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'part-of',
  templateUrl: './part-of.component.html',
  styleUrls: ['./part-of.component.css']
})


// Displays the religions that are part of another religion
export class PartOfComponent implements OnInit {
  @Input() partOfs;


  constructor() {
  }

  ngOnInit() {
  }

}
