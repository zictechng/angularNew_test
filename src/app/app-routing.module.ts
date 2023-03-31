import { HomePageComponent } from './components/dashboard/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './components/auth-page/auth-page.component';

const routes: Routes = [
  {path: '', component: AuthPageComponent },
  {path: 'login', component: AuthPageComponent },
  {path: 'dashboard', component: HomePageComponent },
  {path: 'dashboard/index', component: HomePageComponent },
  {path: 'register', component: HomePageComponent },
  {path: 'reset-password', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
