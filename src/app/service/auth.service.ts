import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interface/user';
import { catchError, Observable, throwError } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  ErrorMsg = signal('');

  constructor() {}

  registerUser = (user: User): Observable<Token> => {
    return this.http
      .post<Token>('register', user)
      .pipe(catchError(this.handleError.bind(this)));
  };

  loginUser = (user: User): Observable<Token> => {
    return this.http
      .post<Token>('login', user)
      .pipe(catchError(this.handleError.bind(this)));
  };
  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof Error) {
      this.ErrorMsg.set(error.message);
    } else {
      this.ErrorMsg.set(error.error.message);
    }
    return throwError(error);
  };
}
