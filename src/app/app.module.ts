import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MeComponent } from './components/me/me.component';
import { CarComponent } from './components/car/car.component';
import { UserComponent } from './components/user/user.component';
import { LoginModule } from "./components/login/login.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MeComponent,
    CarComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
