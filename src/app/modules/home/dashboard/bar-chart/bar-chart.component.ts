import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  chartCategories = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  categoriesTotalCount = [65, 59, 80, 81, 56, 55, 40];

  constructor() { }

  ngOnInit(): void {
  }


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins: any = [

  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.chartCategories,
    datasets: [
      {
        data: this.categoriesTotalCount,
        label: 'Categories',
        backgroundColor: '#00364df8'
      },

    ]
  };

  // events

  // public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  // }

  // public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  // }



}
