import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeComponent } from './components/me/me.component';
import { CarComponent } from './components/car/car.component';
import { UserComponent } from './components/user/user.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { LoginModule } from "./components/login/login.module";

@NgModule({
  declarations: [
    AppComponent,
    MeComponent,
    CarComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    LoginModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
