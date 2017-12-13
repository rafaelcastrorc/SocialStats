import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseChartDirective, ChartsModule} from 'ng2-charts';

interface Indicator {
  code: string;
  name: string;
  description: string;
}

interface Country {
  code: string;
  name: string;
}

interface Query1 {
  y2000: number; y2001: number; y2002: number; y2003: number; y2004: number; y2005: number;
}

@Component({
  selector: 'app-world-bank-visualizer',
  templateUrl: './world-bank-visualizer.component.html',
  styleUrls: ['./world-bank-visualizer.component.css']
})

export class WorldBankVisualizerComponent implements OnInit {
  @Input() current: string;
  @ViewChild('baseChart') chart: BaseChartDirective;

  allIndicators: Indicator[];
  allCountries: Country[];
  allYears: number[] = [1970, 1971, 1972, 1973, 1974, 1975, 2000, 2001, 2002, 2003, 2004];
  // country_1: Country;
  // indicator_1: Indicator;
  // query1: Query1[];
  // temp1: number;
  graphdata1: number[] = [1, 2, 1, 1, 1, 2];
  // labels1: string[] = ['y2000', 'y2001', 'y2002', 'y2003', 'y2d004', 'y2d005', 'y2006', 'y2007', 'y2008', 'y2009', 'y2010'];
  // barChartData1: any[] = [{data: this.graphdata1, label: 'Series A'}];
  barChartType = 'line';
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  country1_2: Country = {name: 'India', code: 'IND'};
  country2_2: Country = {name: 'India', code: 'IND'};
  indicator_2: Indicator = {name: 'Population', code: 'SP.POP.TOTL', description:'Total Population'};
  graphdata1_2: number[] = [];
  graphdata2_2: number[] = [];
  labels_2: string[] = [];
  // labels_2: string[] = [];
  lineChartData_2: any[] = [{data: this.graphdata1_2, label: 'Series A'},
                          {data: this.graphdata2_2, label: 'Series B'}];
  country1_3: Country = {name: 'India', code: 'IND'};
  country2_3: Country = {name: 'India', code: 'IND'};
  graphdata1_3: number[] = [1, 2, null, null, 1, 2];
  graphdata2_3: number[] = [1, 2, null, null, 1, 2];
  year_3 = 2004;
  labels_3: string[] = ['y2000', 'y2001', 'y2002', 'y2003', 'y20d04', 'y20d05', 'y2006', 'y2007', 'y2008', 'y2009', 'y2010'];
  lineChartData_3: any[] = [{data: this.graphdata1_2, label: 'Series A'},
    {data: this.graphdata2_2, label: 'Series B'}];
  chartType_3 = 'radar';
  divide: number[] = [];
  indicator_4: Indicator;
  year_4: number;
  graphdata_4: number[] = [];
  labels_4: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  lineChartData_4: any[] = [{data: this.graphdata_4, label: 'Series A'}];
  barChartType_4 = 'bar';
  barChartOptions_4: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  private labels_5: string[];
  tempnames = ['a', 'b'];
  tempvalues = [1 , 2];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Country[]>('/api_world/allCountries'
    ).subscribe(data => {
      this.allCountries = data;
    });
    this.http.get<Indicator[]>('/api_world/allIndicators'
    ).subscribe(data => {
      this.allIndicators = data;
    });
    this.indicator_2 = this.allIndicators[0];
    this.country1_2 = this.allCountries[0];
    this.country2_2 = this.allCountries[0];
    this.country1_3 = this.allCountries[0];
    this.country2_3 = this.allCountries[0];
    this.year_3 = 2001;
    this.year_4 = 2001;
  }

  // onSubmitAllIndicators() {
  //   this.http.get<Indicator[]>('/api_world/allIndicators'
  //   ).subscribe(data => {
  //     this.allIndicators = data;
  //   });
  // }

  // onSelectCountry_1(country: Country) {
  //   if (country.code != null) {
  //     this.country_1 = country;
  //   }
  // }

  // onSelectIndicator_1(indicator: Indicator) {
  //   if (indicator.code != null) {
  //     this.indicator_1 = indicator;
  //   }
  // }

  // onSubmit_1() {
  //   // this.graphdata1 = [1, 1, 1, 1, 1, 1];
  //   this.http.get<Query1[]>('/api_world/query1' + '/' + this.country_1.code + '/' + this.indicator_1.code
  //   ).subscribe(data => {
  //     this.graphdata1 = Object.values(data[0]);
  //     this.labels1 = Object.keys(data[0]);
  //     this.barChartData1 = [{data: this.graphdata1, label: this.country_1.name}];
  //   });
  // }

  onSubmit_2() {
    this.http.get<Query1[]>('/api_world/query1' + '/' + this.country1_2.code + '/' + this.indicator_2.code
    ).subscribe(data => {
      this.graphdata1_2 = Object.values(data[0]);
      this.graphdata1_2.shift();
      this.graphdata1_2.shift();
      let temp = Object.keys(data[0]);
      temp.shift();
      temp.shift();
      this.labels_2 = temp;
    });
    this.http.get<Query1[]>('/api_world/query1' + '/' + this.country2_2.code + '/' + this.indicator_2.code
    ).subscribe(data => {
      this.graphdata2_2 = Object.values(data[0]);
      this.graphdata2_2.shift();
      this.graphdata2_2.shift();
    });
    this.lineChartData_2 = [{data: this.graphdata1_2, label: this.country1_2.name},
      {data: this.graphdata2_2, label: this.country2_2.name}];
  }

  onSelectIndicator_2(indicator: Indicator) {
    if (indicator.code != null) {
      this.indicator_2 = indicator;
    }
  }

  onSelectCountryTwo_2(indicator: Indicator) {
    if (indicator.code != null) {
      this.country2_2 = indicator;
    }
  }

  onSelectCountryOne_2(country: Country) {
    if (country.code != null) {
      this.country1_2 = country;
    }
  }

  onSelectCountryOne_3(country: Country) {
    if (country.code != null) {
      this.country1_3 = country;
    }
  }

  onSelectCountryTwo_3(country: Country) {
    if (country.code != null) {
      this.country2_3 = country;
    }
  }

  onSelectYear_3(year: number) {
    if (year != null) {
      this.year_3 = year;
    }
  }

  onSubmit_3() {
    const usa = 'USA';
    this.http.get<any[]>('/api_world/query3' + '/' + usa + '/' + this.year_3
    ).subscribe(data => {
      let index;
      this.divide = [];
      for (index = 0; index < data.length; index++) {
        this.divide.push((Object.values(data[index]))[0]);
      }
    });
    this.http.get<any[]>('/api_world/query3' + '/' + this.country1_3.code + '/' + this.year_3
    ).subscribe(data => {
      let index;
      this.graphdata1_3 = [];
      for (index = 0; index < data.length; index++) {
        this.graphdata1_3.push((Object.values(data[index]))[0] / this.divide[index]);
      }
      this.labels_3 = [];
      for (index = 0; index < this.allIndicators.length; index++) {
        this.labels_3.push(this.allIndicators[index].name);
      }
    });
    this.http.get<Query1[]>('/api_world/query3' + '/' + this.country2_3.code + '/' + this.year_3
    ).subscribe(data => {
      this.graphdata2_3 = [];
      let index;
      for (index = 0; index < data.length; index++) {
        this.graphdata2_3.push((Object.values(data[index]))[0] / this.divide[index]);
      }
    });
    // this.labels_3.splice(3, 1);
    // this.graphdata1_3.splice(3, 1);
    // this.graphdata2_3.splice(3, 1);
    this.lineChartData_3 = [{data: this.graphdata1_3, label: this.country1_3.name},
      {data: this.graphdata2_3, label: this.country2_3.name}];
}

  onSelectIndicator_4(indicator: Indicator) {
    if (indicator.code != null) {
      this.indicator_4 = indicator;
    }
  }

  onSelectYear_4(year) {
    if (year != null) {
      this.year_4 = year;
    }
  }

  onSubmit_4() {
    this.current = 'temp';
    this.http.get<any[]>('/api_world/query4' + '/' + this.indicator_4.code + '/' + this.year_4
    ).subscribe(data => {
      let index;
      this.graphdata_4 = [];
      this.labels_4 = [];
      for (index = 0; index < data.length; index++) {
        this.labels_4.push((Object.values(data[index]))[0]);
        this.graphdata_4.push((Object.values(data[index]))[1] );
      }
      this.lineChartData_4 = [{data: this.graphdata_4, label: this.indicator_4.name}];
      this.current = 'Top Ten';
    });
    // this.getPercentChange('India','SP.POP.TOTL', 2004, 2010);
  }

  getTopTen(indicator: string, year: number, mode: string) {
    this.http.get<any[]>('/api_world/top10' + '/' + indicator  + '/' + year + '/' + mode
    ).subscribe(data => {
      let index;
      let names = [];
      let values = [];
      for (index = 0; index < data.length; index++) {
        names.push((Object.values(data[index]))[0]);
        values.push((Object.values(data[index]))[1] );
      }
      this.tempvalues = [];
      this.tempnames = [];
    });
  }

  getPercentChange(country: string, indicator: string, year1: number, year2: number) {
    this.http.get<any[]>('/api_world/percentDifference' + '/' + country  + '/' + indicator + '/' + year1 + '/' + year2
    ).subscribe(data => {
      let percent;
      percent = data[0].percent;
      this.tempvalues.push(percent);
    });
  }
}
