import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FaqComponent } from './components/faq/faq.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ManagerProfileComponent } from './components/manager-profile/manager-profile.component';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'user/:id/profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'manager/:id/profile', component: ManagerProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'restaurant-page/:id', component: RestaurantPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
