import { Component, OnInit } from '@angular/core';
import { CoindeskapiService } from '../../coindeskapi.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {
  coinFullData;
  constructor(private _http: CoindeskapiService) {}
  type = 'line';
  options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: true,
      intersect: false,
      mode: 'label'
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 0,
        bottom: 0
      }
    },
    hover: {
      animationDuration: 500,
      mode: 'index',
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          type: 'time',
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxRotation: 0,
            minRotation: 0,
            autoSkip: true
          }
        }
      ],
      yAxes: [
        {
          display: true,
          type: 'linear',
          gridLines: {
            display: true,
            drawBorder: false
          },
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 2,
        pointStyle: 'cross'
      }
    }
  };
  data;
  pipe = new DatePipe('en-IN');
  timeStamp;
  price;
  currentCurrency = 'INR';
  todayDate = moment().format('YYYY-MM-DD');
  selectedTime = moment()
  .subtract(1, 'week')
  .format('YYYY-MM-DD');
  // prettier-ignore
  currencies = ['INR', 'AUD', 'BDT', 'BTC', 'EGP', 'EUR', 'AED', 'IQD', 'LKR', 'NZD', 'USD', 'ZAR', 'ZWL' ];
  ngOnInit() {
    this._http.getInitialData().subscribe(
      data => {
       // console.log(data);
        this.coinFullData = data;
        this.formatData(this.coinFullData.bpi);
      },
      error => {
        console.log(error);
      }
    );
  }
  formatData(data) {
    const keys = Object.keys(data);
    this.timeStamp = keys.map(key => {
      return this.pipe.transform(key, 'mediumDate');
    });
    const values = Object.values(data);
    this.price = values.map(value => Math.round(Number(value) * 10) / 10);
    this.data = {
      labels: this.timeStamp,
      datasets: [
        {
          label: 'Price',
          data: this.price,
          borderColor: '#3a97ff',
          pointHoverRadius: 0,
          tension: 0,
          spanGaps: true,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          fill: false
        }
      ]
    };
  }
  getData(event) {
    const d = event.target.value.split('');
    this.selectedTime = moment()
      .subtract(Number(d[0]), d[1])
      .format('YYYY-MM-DD');
    this._http.getPrice( this.currentCurrency , this.selectedTime, this.todayDate).subscribe(
      data => {
       // console.log(data);
        this.coinFullData = data;
        this.formatData(this.coinFullData.bpi);
      },
      error => {
        console.log(error);
      }
    );
  }
  currecyChange(event) {
   // console.log(event.target.value);
    this.currentCurrency = event.target.value;
    this._http.getPrice( this.currentCurrency , this.selectedTime, this.todayDate).subscribe(
      data => {
       // console.log(data);
        this.coinFullData = data;
        this.formatData(this.coinFullData.bpi);
      },
      error => {
        console.log(error);
      }
    );
  }
}
