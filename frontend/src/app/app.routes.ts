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
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () =>
      import('./pages/sobre-nosotros/sobre-nosotros.page').then(
        (m) => m.SobreNosotrosPage
      ),
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./pages/cookies/cookies.page').then((m) => m.CookiesPage),
  },
  {
    path: 'busqueda-viajes',
    loadComponent: () =>
      import('./pages/busqueda-viajes/busqueda-viajes.page').then(
        (m) => m.BusquedaViajesPage
      ),
  },  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'perfil-usuario',
    loadComponent: () => import('./pages/perfil-usuario/perfil-usuario.page').then( m => m.PerfilUsuarioPage)
  },
  {
    path: 'nuevo-viaje',
    loadComponent: () => import('./pages/nuevoViaje/nuevo-viaje/nuevo-viaje.page').then( m => m.NuevoViajePage)
  },
  {
    path: 'data-viaje',
    loadComponent: () => import('./pages/nuevoViaje/data-viaje/data-viaje.page').then( m => m.DataViajePage)
  },
  {
    path: 'centro-ayuda',
    loadComponent: () => import('./pages/centro-ayuda/centro-ayuda.page').then( m => m.CentroAyudaPage)
  },

];
