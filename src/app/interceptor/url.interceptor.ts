import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseURL = environment.APIURL;
  req = req.clone({
    url: `${baseURL}/${req.url}`,
  });
  return next(req);
};
