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
import {CartComponent} from './cart/cart.component'


const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {path: 'start', component: StartComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'cart' , component: CartComponent, canActivate:[AuthGuard]},
  { path: 'profile', component: ProfileComponent,  resolve: { data: UserResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
