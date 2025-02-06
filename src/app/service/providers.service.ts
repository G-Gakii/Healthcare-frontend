import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, Provider, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Providers, providersResponse } from '../interface/providers';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  private http = inject(HttpClient);
  providerError = signal('');
  providersSignal = signal<Providers[]>([]);

  constructor() {}

  getProviders(): Observable<providersResponse> {
    return this.http
      .get<providersResponse>('providers')
      .pipe(catchError(this.handleError.bind(this)));
  }
  searchProvider(
    latitude: number,
    longitude: number,
    specialization: string
  ): Observable<providersResponse> {
    return this.http.post<providersResponse>('providers/nearest', [
      latitude,
      longitude,
      specialization,
    ]);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      this.providerError.set(error.error.message);
    } else {
      this.providerError.set(error.message);
    }
    return throwError(error);
  }
}
