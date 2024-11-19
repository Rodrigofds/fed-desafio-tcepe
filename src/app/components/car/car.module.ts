import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarComponent } from './car.component';



@NgModule({
  declarations: [CarComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CarComponent]
})
export class CarModule { }
