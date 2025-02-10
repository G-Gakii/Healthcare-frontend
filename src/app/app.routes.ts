import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'nav',
    loadComponent: () =>
      import('./pages/nav/nav.component').then((c) => c.NavComponent),
  },
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'search-provider',
    loadComponent: () =>
      import('./healthcare/providers/providers.component').then(
        (c) => c.ProvidersComponent
      ),
  },
  {
    path: 'provider/details',
    loadComponent: () =>
      import('./healthcare/providers-details/providers-details.component').then(
        (c) => c.ProvidersDetailsComponent
      ),
  },
  {
    path: 'providers/form',
    loadComponent: () =>
      import('./healthcare/provider-form/provider-form.component').then(
        (c) => c.ProviderFormComponent
      ),
    canActivate: [authGuard],
  },
];
