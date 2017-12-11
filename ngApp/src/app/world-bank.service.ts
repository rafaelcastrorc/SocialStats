import { Injectable } from '@angular/core';
import {Indicator} from './Indicator';

@Injectable()
export class WorldBankService {

  constructor() { }

  getIndicators(): Indicator[] {
    return [{code: 'IND', name: 'India'}, {code: 'PAK', name: 'Pakistan'}];
  }

}
