import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarChartComponent } from './dashboard/bar-chart/bar-chart.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ProfilePageComponent,
    DashboardComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class HomeModule { }
