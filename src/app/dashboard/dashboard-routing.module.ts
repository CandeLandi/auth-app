import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboarLayoutComponent } from './layouts/dashboar-layout/dashboar-layout.component';

const routes: Routes = [

  {
    path: '',
    component: DashboarLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
