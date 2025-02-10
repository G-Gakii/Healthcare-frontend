import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, Provider, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Providers, providersResponse } from '../interface/providers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProvider } from '../interface/add-provider';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  private http = inject(HttpClient);
  providerError = signal('');
  providersSignal = signal<Providers[]>([]);
  fb = inject(FormBuilder);
  providerForm!: FormGroup;
  providerId = signal('');

  constructor() {
    this.providerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      consultation_fee: [0, [Validators.required, Validators.min(0)]],
      location: this.fb.group({
        type: ['point'],
        coordinates: this.fb.array([0, 0], [Validators.required]),
      }),
      specialization: this.fb.array(
        [this.fb.control('')],
        [Validators.required]
      ),
      insurance: this.fb.array([this.fb.control('')]),
    });
  }

  getProviders(): Observable<providersResponse> {
    return this.http
      .get<providersResponse>('providers')
      .pipe(catchError(this.handleError.bind(this)));
  }
  getProvider(id: string): Observable<Providers> {
    return this.http.get<Providers>(`providers/${id}`);
  }
  searchProvider(
    latitude: number,
    longitude: number,
    specialization: string
  ): Observable<Providers[]> {
    return this.http.get<Providers[]>(
      `providers/nearest/${latitude}/${longitude}/${specialization}`
    );
  }
  AddProviders(provider: AddProvider) {
    return this.http
      .post('providers', provider)
      .pipe(catchError(this.handleError.bind(this)));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      this.providerError.set(error.error.message);
      console.log(this.providerError());
    } else {
      this.providerError.set(error.message);
      console.log(this.providerError());
    }
    return throwError(error);
  }
}
