import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ReligionsComponent} from './religions/religions.component';
import {ConflictComponent} from './conflict/conflict.component';
import {WorldBankComponent} from './world-bank/world-bank.component';



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'religions', component: ReligionsComponent},
  {path: 'conflict', component: ConflictComponent},
  {path: 'world', component: WorldBankComponent},
  {path: 'home', component: HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
