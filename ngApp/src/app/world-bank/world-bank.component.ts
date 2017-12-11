import { Component, OnInit } from '@angular/core';
import { Indicator } from '../Indicator';
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
  currentQuery = 'All Indicators'

  queries: string[] = [
    'All Indicators',
    'Rest of the queries',
    'Two Indicators',
    'Compare two Countries'
  ];


  onSelect(query: string) {
    this.currentQuery = query;
  }

  constructor(private worldBankService: WorldBankService) { }

  ngOnInit() {}
}
