import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';
import { SafePipe } from './safe.pipe';
import { DropdownModule } from 'ngx-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { ChartsModule } from 'ng2-charts';

// Accounts Page
import { AccountsComponent } from './accounts/accounts.component';

// Religion Page
import { ReligionsComponent } from './religions/religions.component';
import { ReligionVisualizerComponent } from './religion-visualizer/religion-visualizer.component';
import { QueryListComponent } from './religion-queries/query-list/query-list.component';
import { QueryReligionTopReligionPerCountryComponent } from './religion-queries/query-religion-top-religion-per-country/query-religion-top-religion-per-country.component';
import { QueryNumberOfFollowersComponent } from './religion-queries/query-number-of-followers/query-number-of-followers.component';
import { QueryReligionFewestCountriesComponent } from './religion-queries/query-religion-fewest-countries/query-religion-fewest-countries.component';
import { PartOfComponent } from './religion-queries/part-of/part-of.component';
import { QueryChangeOfReligionOverTimeComponent } from './religion-queries/query-change-of-religion-over-time/query-change-of-religion-over-time.component';

// Conflicts Page
import { ConflictComponent } from './conflict/conflict.component';
import { ConflictVisualizerComponent } from './conflict-visualizer/conflict-visualizer.component';
import { QueryNumConflictsInCountryComponent } from './conflict-queries/query-num-conflicts-in-country/query-num-conflicts-in-country.component';
import { QueryNumDeathsInCountryComponent } from './conflict-queries/query-num-deaths-in-country/query-num-deaths-in-country.component';
import { QueryConflictLocationsComponent } from './conflict-queries/query-conflict-locations/query-conflict-locations.component';
import { NguiMapModule } from '@ngui/map';
import {WorldBankComponent} from './world-bank/world-bank.component';
import {WorldBankVisualizerComponent} from './world-bank-visualizer/world-bank-visualizer.component';
import {WorldBankService} from './world-bank.service';



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
    PartOfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    HttpClientModule,
    NgHttpLoaderModule,
    ChartsModule
  ],
  providers: [WorldBankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
