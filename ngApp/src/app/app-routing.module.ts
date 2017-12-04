import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ReligionsComponent} from './religions/religions.component';
import {ConflictComponent} from "./conflict/conflict.component";
import {WorldbankComponent} from "./worldbank/worldbank.component";
import {WorldComponent} from './world/world.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'religions', component: ReligionsComponent},
  {path: 'conflict', component: ConflictComponent},
  {path: 'worldbank', component: WorldbankComponent},
  {path: 'world', component: WorldComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
