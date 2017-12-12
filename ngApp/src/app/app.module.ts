import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReligionsComponent } from './religions/religions.component';
import {QueryListComponent} from './religion-queries/query-list/query-list.component';
import {HttpModule} from '@angular/http';
import { SafePipe } from './safe.pipe';
import { ReligionVisualizerComponent } from './religion-visualizer/religion-visualizer.component';
import {DropdownModule} from 'ngx-dropdown';
import { QueryNumberOfFollowersComponent } from './religion-queries/query-number-of-followers/query-number-of-followers.component';
import { ConflictComponent } from './conflict/conflict.component';
import {WorldBankComponent} from './world-bank/world-bank.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { QueryReligionFewestCountriesComponent } from './religion-queries/query-religion-fewest-countries/query-religion-fewest-countries.component';
import { QueryReligionTopReligionPerCountryComponent } from './religion-queries/query-religion-top-religion-per-country/query-religion-top-religion-per-country.component';
import { PartOfComponent } from './religion-queries/part-of/part-of.component';
import { QueryChangeOfReligionOverTimeComponent } from './religion-queries/query-change-of-religion-over-time/query-change-of-religion-over-time.component';
import { ChartsModule } from 'ng2-charts';
import { ReligionMainComponent } from './religion-queries/religion-main/religion-main.component';
import { WorldBankVisualizerComponent } from './world-bank-visualizer/world-bank-visualizer.component';
import {WorldBankService} from './world-bank.service';
import { SidebarModule } from 'ng-sidebar';
import { QueryReligionPercentageComponent } from './religion-queries/query-religion-percentage/query-religion-percentage.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReligionsComponent,
    QueryListComponent,
    SafePipe,
    ReligionVisualizerComponent,
    QueryNumberOfFollowersComponent,
    QueryNumberOfFollowersComponent,
    ConflictComponent,
    AccountsComponent,
    QueryReligionFewestCountriesComponent,
    WorldBankComponent,
    WorldBankVisualizerComponent,
    QueryReligionFewestCountriesComponent,
    QueryReligionTopReligionPerCountryComponent,
    PartOfComponent,
    QueryChangeOfReligionOverTimeComponent,
    ReligionMainComponent,
    QueryReligionPercentageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    HttpClientModule,
    NgHttpLoaderModule,
    ChartsModule,
    SidebarModule.forRoot(),
  ],
  providers: [WorldBankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
