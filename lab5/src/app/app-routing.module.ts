import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import {AuthGuard} from './core/auth.guard';
import {AdminGuard} from './core/admin.guard';
import { UserResolver } from './user/user.resolver';
import {StartComponent} from './start/start.component';
import {AdminComponent} from './admin/admin.component';
import {ProfileComponent} from './profile/profile.component';
import {CartComponent} from './cart/cart.component';
import {PolicyComponent} from './policy/policy.component';
import {DMCAComponent} from './dmca/dmca.component';


const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {path: 'start', component: StartComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: 'cart' , component: CartComponent, canActivate:[AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],  resolve: { data: UserResolver}},
  { path: 'policy', component: PolicyComponent},
  { path: 'DMCA', component: DMCAComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
