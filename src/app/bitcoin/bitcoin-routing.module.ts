import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinComponent } from './coin/coin.component';

const routes: Routes = [
  { path: '', component: CoinComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitcoinRoutingModule { }
