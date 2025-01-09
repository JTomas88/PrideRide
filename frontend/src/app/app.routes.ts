import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.component').then((m) => m.RegistroComponent),
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () => import('./pages/sobre-nosotros/sobre-nosotros.page').then( m => m.SobreNosotrosPage)
  },  {
    path: 'cookies',
    loadComponent: () => import('./pages/cookies/cookies.page').then( m => m.CookiesPage)
  },

];
