import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboarLayoutComponent } from './layouts/dashboar-layout/dashboar-layout.component';
import { UserCardComponent } from './components/user-card/user-card.component';


@NgModule({
  declarations: [
    DashboarLayoutComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
