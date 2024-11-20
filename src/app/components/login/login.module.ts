import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule,
     FormsModule,
     MatButtonModule,
     MatInputModule,
     MatDialogModule,
     MatTableModule,
     MatFormFieldModule,
     MatIconModule],
  exports: [LoginComponent]
})
export class LoginModule {}
