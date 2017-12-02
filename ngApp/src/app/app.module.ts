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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReligionsComponent,
    QueryListComponent,
    SafePipe,
    ReligionVisualizerComponent,
    QueryNumberOfFollowersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
