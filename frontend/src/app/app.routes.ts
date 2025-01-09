import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.component').then((m) => m.RegistroComponent),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'busqueda-viajes',
    loadComponent: () => import('./pages/busqueda-viajes/busqueda-viajes.page').then( m => m.BusquedaViajesPage)
  },
];
