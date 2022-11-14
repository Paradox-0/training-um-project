import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCardResolverGuard } from 'src/app/auth/bookCard-resolver.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: HomeComponent, children: [
      { path: 'profile', component: ProfilePageComponent, data: { animation: 'profilePage' } },
      { path: 'dashboard', component: DashboardComponent, resolve: { bookCardData: BookCardResolverGuard }, data: { animation: 'dashboardPage' } }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
