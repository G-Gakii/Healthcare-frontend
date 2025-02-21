import {
  HttpErrorResponse,
  HttpEventType,
  HttpInterceptorFn,
} from '@angular/common/http';
import { map } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((res) => {
      if (res.type === HttpEventType.Response) {
        const body = res.body as { success: boolean; message?: string };
        if (body.success === false) {
          throw new HttpErrorResponse({ error: body.message });
        }
        return res;
      }
      return res;
    })
  );
};
