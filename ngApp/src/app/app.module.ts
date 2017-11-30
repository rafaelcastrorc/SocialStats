import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReligionsComponent } from './religions/religions.component';
import { CountryListComponent } from './country-list/country-list.component';
import { ReligionListComponent } from './religion-list/religion-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReligionsComponent,
    CountryListComponent,
    ReligionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
