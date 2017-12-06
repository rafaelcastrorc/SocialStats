import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface CountryReligionNumber {
  country: string;
  religion: string;
  number: string;
}


@Component({
  selector: 'query-religion-top-religion-per-country',
  templateUrl: './query-religion-top-religion-per-country.component.html',
  styleUrls: ['./query-religion-top-religion-per-country.component.css']
})
export class QueryReligionTopReligionPerCountryComponent implements OnInit {
  @Input() years;
  @Output() SelectYear = new EventEmitter();
  selectedYear = 'Select a Year';
  selectedTop = 'Select number of results';
  hasSelectedTop = false;
  hasSelectedYear = false;
  displayAlert = false;
  queryResults3: CountryReligionNumber[];
  tops: String[] = [
    '1', '2', '3'];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  onSelectYear(year: string) {
    this.selectedYear = year;
    this.hasSelectedYear = true;
  }

  onSelectTop(limit: string) {
    this.selectedTop = limit;
    this.hasSelectedTop = true;
  }


  onSubmit() {
    if (this.hasSelectedYear && this.hasSelectedTop) {
      this.http.get<CountryReligionNumber[]>('/api_religion/queries/mostpopular' + '/' + this.selectedYear + '/' +
        this.selectedTop
      ).subscribe(data => {
        this.queryResults3 = data;
      });
    } else {
      this.displayAlert = true;
    }
  }

  dismissAlert() {
    this.displayAlert = false;
  }

}
