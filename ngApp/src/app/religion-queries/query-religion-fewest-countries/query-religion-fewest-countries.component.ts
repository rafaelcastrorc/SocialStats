import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from '../../country';
import {DropdownModule} from 'ngx-dropdown';
import {Religion} from '../../religion';
import {HttpClient} from '@angular/common/http';

console.log('Hello1');

interface ReligionYearNumber {
  name: string;
  year: string;
  number: string;
}

@Component({
  selector: 'query-religion-fewest-countries',
  templateUrl: './query-religion-fewest-countries.component.html',
  styleUrls: ['./query-religion-fewest-countries.component.css']

})
export class QueryReligionFewestCountriesComponent implements OnInit {
  @Input() years;
  @Output() SelectYear = new EventEmitter();
  selectedYear = 'Select a Year';
  selectedLimit = 'Select a Limit';
  hasSelectedLimit = false;
  hasSelectedYear = false;
  displayAlert = false;
  queryResults2: ReligionYearNumber[];
  limits: String[] = [
    '1', '2', '3', '5', '10', '15', '20'];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  onSelectYear(year: string) {
    this.selectedYear = year;
    this.hasSelectedYear = true;
  }

  onSelectLimit(limit: string) {
    if (limit === 'All results') {
      this.selectedLimit = 'All results';
    } else {
      this.selectedLimit = limit;
    }
    this.hasSelectedLimit = true;
  }


  onSubmit() {
    if (this.hasSelectedYear && this.hasSelectedLimit) {
      this.http.get<ReligionYearNumber[]>('/api_religion/queries/leastfollowed' + '/' + this.selectedYear + '/' +
        this.selectedLimit
      ).subscribe(data => {
        this.queryResults2 = data;
      });
    } else {
      this.displayAlert = true;
    }
  }

  dismissAlert() {
    this.displayAlert = false;
  }

}
