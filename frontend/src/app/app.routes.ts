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
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'perfil-usuario',
    loadComponent: () =>
      import('./pages/perfil-usuario/perfil-usuario.page').then(
        (m) => m.PerfilUsuarioPage
      ),
  },
  {
    path: 'nuevo-viaje',
    loadComponent: () =>
      import('./pages/nuevoViaje/nuevo-viaje/nuevo-viaje.page').then(
        (m) => m.NuevoViajePage
      ),
  },
  {
    path: 'data-viaje',
    loadComponent: () =>
      import('./pages/nuevoViaje/data-viaje/data-viaje.page').then(
        (m) => m.DataViajePage
      ),

  },
  {
    path: 'resumen-viaje',
    loadComponent: () =>
      import('./pages/nuevoViaje/data-viaje/componentes-viaje/resumen-viaje/resumen-viaje.component').then(
        (m) => m.ResumenViajeComponent
      ),
  },
  {
    path: 'centro-ayuda',
    loadComponent: () =>
      import('./pages/centro-ayuda/centro-ayuda.page').then(
        (m) => m.CentroAyudaPage
      ),
  },
  {
    path: 'faqs',
    loadComponent: () =>
      import('./pages/faqs/faqs.page').then((m) => m.FaqsPage),
  },
  {
    path: 'mi-perfil',
    loadComponent: () =>
      import(
        './pages/perfil-usuario/componentesPerfil/mi-perfil/mi-perfil.page'
      ).then((m) => m.MiPerfilPage),
  },
  {
    path: 'ajustes-cuenta',
    loadComponent: () =>
      import(
        './pages/perfil-usuario/componentesPerfil/ajustes-cuenta/ajustes-cuenta.page'
      ).then((m) => m.AjustesCuentaPage),
  },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/terminos/terminos.page').then( m => m.TerminosPage)
  },
  {
    path: 'saldo-transferencias',
    loadComponent: () => import('./pages/perfil-usuario/componentesPerfil/saldo-transferencias/saldo-transferencias.page').then( m => m.SaldoTransferenciasPage)
  },
  {
    path: 'decalogo',
    loadComponent: () => import('./pages/decalogo/decalogo.page').then( m => m.DecalogoPage)
  },

];
