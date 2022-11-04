import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { BookDataBaseService } from 'src/app/services/dashboard-services/bookDatabase.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  graphDataSubscription: Subscription;
  graphData: any;
  Categories: any = [];
  CountCategrories: any = [];

  chartCategories = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  //chartCategories: any = [];
  categoriesTotalCount = [65, 59, 80, 81, 56, 55, 40];

  constructor(private bookDataBaseService: BookDataBaseService) { }

  ngOnInit(): void {

    this.graphDataSubscription = this.bookDataBaseService.getGraphData().subscribe({
      next: (response) => {
        this.graphData = response;
        console.log(this.graphData);
        for (let i = 0; i < this.graphData.categoryDetail.length; i++) {
          this.Categories.push(this.graphData.categoryDetail[i].category);
          this.CountCategrories.push(this.graphData.categoryDetail[i].noOfBooks);
        }
        console.log(this.Categories);
        console.log(this.CountCategrories);
        // this.chartCategories = this.Categories;
        // this.categoriesTotalCount = this.CountCategrories;

        // Directly assigning catogries details to barchartdata
        this.barChartData.labels = this.Categories;
        this.barChartData.datasets[0].data = this.CountCategrories;
        //
        console.log(this.chartCategories);
        this.chart.update();
      },
      error: (e) => {
        console.log(e);
        console.log('BarChart Error');
      }
    })
  }


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;



  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0.2
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
        label: 'Total Books',
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
