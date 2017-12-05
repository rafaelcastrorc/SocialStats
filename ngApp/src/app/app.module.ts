import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReligionsComponent } from './religions/religions.component';
import {QueryListComponent} from './query-list/query-list.component';
import {HttpModule} from '@angular/http';
import { SafePipe } from './safe.pipe';
import { ReligionVisualizerComponent } from './religion-visualizer/religion-visualizer.component';
import {DropdownModule} from 'ngx-dropdown';
import { QueryNumberOfFollowersComponent } from './query-number-of-followers/query-number-of-followers.component';
import { ConflictComponent } from './conflict/conflict.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { QueryReligionFewestCountriesComponent } from './query-religion-fewest-countries/query-religion-fewest-countries.component';
import { WorldBankComponent } from './world-bank/world-bank.component';
import { WorldBankVisualizerComponent } from './world-bank-visualizer/world-bank-visualizer.component';
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
    WorldBankVisualizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    HttpClientModule,
    NgHttpLoaderModule,
  ],
  providers: [WorldBankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
