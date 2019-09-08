import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NetworkComponent } from './components/network/network.component';


const routes: Routes = [
  {path: '', component: NavComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'network', component: NetworkComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
