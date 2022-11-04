import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCardResolverService } from 'src/app/services/dashboard-services/bookCard-resolver.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: HomeComponent, children: [
      { path: 'profile', component: ProfilePageComponent },
      { path: 'dashboard', component: DashboardComponent, resolve: { bookCardData: BookCardResolverService } }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
