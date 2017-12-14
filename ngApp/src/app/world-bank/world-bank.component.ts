import { Component, OnInit } from '@angular/core';
import { Indicator } from '../indicator';
import {WorldBankService} from '../world-bank.service';

@Component({
  selector: 'app-world-bank',
  templateUrl: './world-bank.component.html',
  styleUrls: ['./world-bank.component.css']
})
export class WorldBankComponent implements OnInit {

  indicator: Indicator = {
    code : 'ADV',
    name : 'America'
  };
  currentQuery = 'Two Indicators';

  queries: string[] = [
    'Two Indicators',
    'Compare two Countries',
    'Top Ten'
  ];


  onSelect(query: string) {
    this.currentQuery = query;
  }

  constructor(private worldBankService: WorldBankService) { }

  ngOnInit() {}
}
