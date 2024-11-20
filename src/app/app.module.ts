import { UserModule } from './components/user/user.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from "./components/login/login.module";
import { CarModule } from './components/car/car.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileModule } from './components/user-profile/user-profile.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    UserModule,
    CarModule,
    BrowserAnimationsModule,
    UserProfileModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
