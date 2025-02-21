import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, Provider, signal } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Providers, providersResponse, Review } from '../interface/providers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProvider } from '../interface/add-provider';
import { Appointment } from '../interface/appointment';
import { AddReview } from '../interface/add-review';

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
  isDisplayProviders = signal(false);
  isEdit = signal(false);

  appointmentForm!: FormGroup;
  constructor() {
    this.providerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      consultation_fee: [0, [Validators.required, Validators.min(0)]],
      location: this.fb.group({
        type: ['Point'],
        coordinates: this.fb.array([0, 0], [Validators.required]),
      }),
      specialization: this.fb.array(
        [this.fb.control('')],
        [Validators.required]
      ),
      insurance: this.fb.array([this.fb.control('')]),
    });
    this.appointmentForm = this.fb.group({
      date: ['', [Validators.required]],
    });
  }

  getProviders(): Observable<providersResponse> {
    return this.http
      .get<providersResponse>('providers/')
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
      .post('providers/', provider)
      .pipe(catchError(this.handleError.bind(this)));
  }
  bookAppointment(date: Date, id: string) {
    return this.http.post(`appointment/${id}`, date).pipe(
      catchError((error) => {
        return throwError(
          () => new Error(error.error.message || 'Something went wrong')
        );
      })
    );
  }
  personalAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>('appointment/personal');
  }
  EditAppointment(date: Date, id: string) {
    return this.http.put(`appointment/${id}`, date).pipe(
      catchError((error: any) => {
        console.error('Error editing appointment', error);
        return throwError(
          () => new Error(error.error.message || 'Something went wrong')
        );
      })
    );
  }

  deleteAppointment(id: string): Observable<string> {
    return this.http.delete<string>(`appointment/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error deleting appointment:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  reviewProvider(id: string, review: AddReview): Observable<Review> {
    return this.http.post<Review>(`review/${id}`, review).pipe(
      map((res) => res),
      catchError((err) => {
        return throwError(
          () => new Error(err.error.message || 'Something went wrong')
        );
      })
    );
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
