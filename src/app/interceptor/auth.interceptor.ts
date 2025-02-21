import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const url = new URL(req.url);
  if (
    url.hostname !== 'localhost' &&
    url.hostname !== 'healthcare-backend-wxat.onrender.com'
  ) {
    return next(req);
  }
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);
  if (token) {
    if (authService.isTokenExpired(token)) {
      router.navigate(['/login']);
      return next(req);
    }
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
