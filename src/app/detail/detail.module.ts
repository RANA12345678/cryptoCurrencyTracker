import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
// Chart
import { ChartModule } from 'angular2-chartjs';
@NgModule({
  imports: [
    CommonModule,
    DetailRoutingModule,
    ChartModule
  ],
  declarations: [CoinDetailComponent]
})
export class DetailModule { }
