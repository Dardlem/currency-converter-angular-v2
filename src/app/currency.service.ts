import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  exchangeRate = new BehaviorSubject<any>({});
  currencyData = new BehaviorSubject<any>({});

  private API_KEY: string = '';
  private apiURL: string = `https://api.freecurrencyapi.com/v1/`;

  constructor(private http: HttpClient) {}

  setApiKey(apiKey: string){
    this.API_KEY = apiKey;
    console.log('api key set successfully!');
    console.log('Api Key: ', this.API_KEY);
  }

  getCurrencyRate(baseCurrency: string, toCurrency: string[]) {
    let rateURL = `${this.apiURL}latest?apikey=${this.API_KEY}&currencies=${toCurrency}&base_currency=${baseCurrency}`;

    return this.http.get<any>(rateURL).subscribe((data) => {
      console.log('Exchange rates: ', data);
      this.exchangeRate.next(data.data);
    })
  }

  getCurrencies() {
    let currenciesURL = `${this.apiURL}currencies?apikey=${this.API_KEY}`;
    console.log(currenciesURL)
    return this.http.get<any>(currenciesURL).subscribe((data) => {
      this.currencyData.next(data.data);
    })
  }
}