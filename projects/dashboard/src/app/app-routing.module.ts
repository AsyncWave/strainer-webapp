import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: 'projects/dashboard/src/app/modules/navigation/navigation.module#NavigationModule'
  },
  {
    path: '',
    loadChildren: 'projects/dashboard/src/app/modules/auth/auth.module#AuthModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
