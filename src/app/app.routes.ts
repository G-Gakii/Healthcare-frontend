import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard } from './guard/auth.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'appointment',
    loadComponent: () =>
      import('./healthcare/appointment/appointment.component').then(
        (c) => c.AppointmentComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'personalAppointment',
    loadComponent: () =>
      import('./healthcare/your-appointments/your-appointments.component').then(
        (c) => c.YourAppointmentsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'review',
    loadComponent: () =>
      import('./healthcare/review-form/review-form.component').then(
        (c) => c.ReviewFormComponent
      ),
    canActivate: [AuthGuard],
  },
];
