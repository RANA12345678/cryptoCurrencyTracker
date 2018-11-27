import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



//router module used for setting up the application level route


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// progress bar
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



//decorators
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, LoadingBarHttpClientModule, LoadingBarRouterModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {


  
}
