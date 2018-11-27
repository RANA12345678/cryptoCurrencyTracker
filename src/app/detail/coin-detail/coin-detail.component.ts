import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {
  coinId;
  coinData;
  priceDetails;
  timeStamp;
  price;
  data;
  pipe = new DatePipe('en-IN');
  currencyPipe = new CurrencyPipe('en-IN');
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _http: ApiService
  ) {
    this.coinId = this.route.snapshot.paramMap.get('id');
  }
  type = 'line';
  options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: true,
      intersect: false,
      mode: 'index'
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
  ngOnInit() {
    this._http.getCoinPrice(this.coinId, 'INR', '24h').subscribe(
      data => {
        this.priceDetails = data;
        // console.log(data);
        this.filterData(this.priceDetails.data.history);
      },
      error => {
        console.log(error);
      }
    );
    this._http.getCoinDetails(this.coinId, 'INR', '7d').subscribe(
      data => {
        this.coinData = data;
        // console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  filterData(fullData) {
   // console.log(fullData);
    const time = fullData.map(data => {
      return this.pipe.transform(data.timestamp, 'short');
    });
    const price = fullData.map(data => {
      const float = data.price;
      return Math.round(float * 10) / 10;
    });
this.data = {
      labels: time,
      datasets: [
        {
          label: 'Price',
          data: price,
          borderColor: '#3a97ff',
          pointHoverRadius: 0,
          tension: 0,
          spanGaps: true,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          fill: true
        }
      ]
    };
  }
}
