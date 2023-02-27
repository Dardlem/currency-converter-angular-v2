import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CurrencyService } from '../currency.service';
import { CurrencyCardComponent } from './currency-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [CurrencyCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  providers: [CurrencyService],
  exports: [CurrencyCardComponent]
})
export class CurrencyCardModule { }
