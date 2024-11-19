import { UserModule } from './components/user/user.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from "./components/login/login.module";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CarModule } from './components/car/car.module';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    UserModule,
    CarModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
