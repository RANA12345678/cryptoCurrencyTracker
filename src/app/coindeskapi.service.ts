import { Injectable } from '@angular/core';
// import { BitcoinModule } from './bitcoin/bitcoin.module';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoindeskapiService {
  private baseUrl = `https://api.coindesk.com/v1/bpi`;
  constructor(private http: HttpClient) {}
  getPrice(currecy = 'INR', sDate, eDate) {
    return this.http.get(
      `${
        this.baseUrl
      }/historical/close.json?start=${sDate}&end=${eDate}&currency=${currecy}`
    );
  }
  // get initial data
  getInitialData() {
    return this.http.get(`${this.baseUrl}/historical/close.json`);
  }
}
