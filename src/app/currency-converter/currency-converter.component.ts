import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { CurrencyService } from '../currency.service';

interface Currency{
  [currencyCode: string]: {
    code: string,
    decimal_digits: number,
    name: string,
    name_plural: string,
    rounding: number,
    symbol: string,
    symbol_native: string
  }
}

interface CardData{
  [key: number]: {
    currency: string,
    exchangeRate: number,
  }
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})

export class CurrencyConverterComponent {
  //REMOVE BEFORE DEPLOYMENT
  API_KEY: string = 'rvi8sjmrzvpX4cHZFXGhS4AkgHL4VbVdkotCZXYJ'

  amount: number = 0; //Amount to be converted

  selectedCurrencies: string[] = []; //Selected currencies object
  baseCurrency: string = ''; //Base currency
  availableCurrencies: Currency = {};//Available currencies


  exchangeRate: number = 0;

  cardData: CardData = {};

  index: number = 0;

  numericFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ])

  //Constructor
  //Subscribing to observables
  constructor(private currencyService: CurrencyService) {
    //REMOVE BEFORE DEPLOYMENT
    this.setApiKey(this.API_KEY);

    this.currencyService.exchangeRate.subscribe((data) => {
      this.exchangeRate = data[this.baseCurrency];
    })

    this.currencyService.currencyData.subscribe((data) => {
      this.availableCurrencies = data;
      console.log('Available Currencies: ', this.availableCurrencies);
    })
  }

  //Called when a currency is selected by a child component
  onSelectedExchangeCurrency(event: {s: string, i: number}){

    this.cardData[event.i] = {
      currency: event.s,
      exchangeRate: this.exchangeRate
    }

    this.cardData[event.i].currency = event.s;
    this.selectedCurrencies[this.index] = event.s;
    this.convert();
  }

  //Called when the base currency is changed
  onBaseCurrencyChange(event: MatSelectChange){
    this.baseCurrency = event.value;
    this.convert();
  }

  //Called when the amount is changed
  onAmountInput(event: any) {
    this.amount = event.value;
    console.log('Amount: ', this.amount);
  }

  //Called when the API key is changed
  setApiKey(apiKey: string){
    console.log('setting api key...')
    this.currencyService.setApiKey(apiKey);

    //Get the currencies from the API
    this.currencyService.getCurrencies();
    console.log('Just got currencies')

    //After 5 seconds, unsubscribe from the currencyData observable
    setTimeout(() => {
      this.currencyService.currencyData.unsubscribe();
      console.log('Unsubscribed from currencyData');
    }, 5000)
  }

  //Getting rates from the API for the selected currencies
  convert(): void {
    console.log('Converting...');

    if(this.selectedCurrencies.length > 0 && this.baseCurrency != '' ){
      console.log('Converting... True!');
      this.currencyService.getCurrencyRate(this.baseCurrency, this.selectedCurrencies);
    }
  }
}
