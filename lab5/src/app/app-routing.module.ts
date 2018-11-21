import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import {AuthGuard} from './core/auth.guard';
import { UserResolver } from './user/user.resolver';
import {StartComponent} from './start/start.component';
import {AdminComponent} from './admin/admin.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {path: 'start', component: StartComponent},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'profile', component: ProfileComponent, resolve: { data: UserResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
