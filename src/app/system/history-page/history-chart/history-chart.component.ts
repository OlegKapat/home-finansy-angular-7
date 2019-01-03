import { Component, OnInit, Input } from '@angular/core';
// import { single } from './data';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent implements OnInit {
  @Input() data:any[];

  multi: any[];

  view: any[] = [500, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  // showLegend = true;
  showXAxisLabel = true;
  // xAxisLabel = 'Country';
   showYAxisLabel = true;
  // yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {  } // Object.assign(this, { data });}

  ngOnInit() {
  }

}
