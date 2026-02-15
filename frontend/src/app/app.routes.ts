import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegistroComponent } from './auth/registro/registro';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'dashboard', component: Dashboard }
];
