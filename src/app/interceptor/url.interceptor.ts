import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseURL = 'https://healthcare-backend-wxat.onrender.com/api/ach';

  req = req.clone({
    url: `${baseURL}/${req.url}`,
  });
  return next(req);
};
