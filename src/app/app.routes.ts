import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Users } from './users/users';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'users', component: Users, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
