import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { RangePipe } from 'src/app/pipes/range.pipe';



@NgModule({
  declarations: [UserComponent,
    RangePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [UserComponent]
})
export class UserModule { }
