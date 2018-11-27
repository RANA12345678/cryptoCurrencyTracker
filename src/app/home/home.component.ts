import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  coinsFullData: any;
  coinsData: any;
  // tslint:disable-next-line:max-line-length
  currencies = [
    'AUD',
    'BGN',
    'BRL',
    'BTC',
    'CAD',
    'CHF',
    'CNY',
    'CZK',
    'DKK',
    'ETH',
    'EUR',
    'GBP',
    'HKD',
    'HRK',
    'HUF',
    'IDR',
    'ILS',
    'INR',
    'JPY',
    'KRW',
    'MXN',
    'MYR',
    'NOK',
    'NZD',
    'PHP',
    'PLN',
    'RON',
    'RUB',
    'SEK',
    'SGD',
    'THB',
    'TRY',
    'USD',
    'ZAR'
  ];
  times = ['24h', '7d', '30d'];
  constructor(private _http: ApiService, private router: Router) {}

  ngOnInit() {
    this._http.getAll().subscribe(
      data => {
        this.coinsFullData = data;
       // console.log(data);
        this.dataFilter(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  dataFilter(fullData) {
    this.coinsData = fullData.data.coins;
  }
  update(val: NgForm) {
    // console.log(val.value);
    const currency = val.value.currency ? val.value.currency : 'INR';
    const time = val.value.time ? val.value.time : '24h';
    // console.log({ currency, time });
    if (currency !== 'INR' || time !== '24h') {
      this._http.getAll(currency, time).subscribe(
        data => {
          this.coinsFullData = data;
         // console.log(data);
          this.dataFilter(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  onClick(val) {
 // console.log(val);
    this.router.navigate(['/coin', val]);
  }
}
