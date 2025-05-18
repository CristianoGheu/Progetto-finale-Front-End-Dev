import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TemperatureComponent } from './pages/temperature/temperature.component';
import { Co2Component } from './pages/co2/co2.component';
import { MethaneComponent } from './pages/methane/methane.component';
import { No2Component } from './pages/no2/no2.component';
import { PolarIceComponent } from './pages/polar-ice/polar-ice.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'temperature', component: TemperatureComponent
  },
  {
    path: 'co2', component: Co2Component
  },
  {
    path: 'methane', component: MethaneComponent
  },
  {
    path: 'no2', component: No2Component
  },
  {
    path: 'polar-ice', component: PolarIceComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
