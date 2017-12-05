import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Indicator {
  code: string;
  name: string;
}

@Component({
  selector: 'app-world-bank-visualizer',
  templateUrl: './world-bank-visualizer.component.html',
  styleUrls: ['./world-bank-visualizer.component.css']
})
export class WorldBankVisualizerComponent implements OnInit {
  @Input() current: string;

  allIndicators: Indicator[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmitAllIndicators() {
    this.http.get<Indicator[]>('/api_world/allIndicators'
    ).subscribe(data => {
      this.allIndicators = data;
    });
  }
}
