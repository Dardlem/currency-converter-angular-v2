import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyService } from '../currency.service';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { CurrencyCardModule } from "../currency-card/currency-card.module";
import { MatCardModule } from '@angular/material/card';


@NgModule({
    declarations: [
        CurrencyConverterComponent,
    ],
    providers: [CurrencyService],
    exports: [CurrencyConverterComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCardModule,
        CurrencyCardModule,
    ]
})
export class CurrencyConverterModule { }
