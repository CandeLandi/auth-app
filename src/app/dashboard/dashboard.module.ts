import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboarLayoutComponent } from './layouts/dashboar-layout/dashboar-layout.component';


@NgModule({
  declarations: [
    DashboarLayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
