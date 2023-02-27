import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

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

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})

export class CurrencyCardComponent {
  @Input() exchangeRate: number = 0;
  @Input() amount: number = 0;
  @Input() currencies: Currency = {};
  @Input() index: number = 0;

  value: any;

  @Output() selectedExchangeCurrency = new EventEmitter<{s: string, i: number}>();

  numericFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1)
  ]);

  fromCurrency: string = '';
  total: number = 0;

  onAmountInput(event: any){
    console.log(event.value);
  }

  onSelect(event: MatSelectChange){
    this.value = event.value;
    console.log('Currency selected: ', event.value);
    this.selectedExchangeCurrency.emit({s: event.value, i: this.index});
  }
}
