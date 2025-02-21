import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interface/user';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Token } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  ErrorMsg = signal('');
  isloggingIn = signal(false);
  isLoading = signal(false);

  constructor() {}

  registerUser = (user: User): Observable<Token> => {
    return this.http
      .post<Token>('register', user)
      .pipe(catchError(this.handleError.bind(this)));
  };

  loginUser = (user: User): Observable<Token> => {
    console.log('logging start');

    this.isloggingIn.set(true);
    console.log('logging', this.isloggingIn());

    return this.http.post<Token>('login', user).pipe(
      tap((res: Token) => {
        localStorage.setItem('token', res.accessToken);
      }),
      catchError(this.handleError.bind(this))
    );
  };
  getToken() {
    return localStorage.getItem('token');
  }
  isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof Error) {
      this.ErrorMsg.set(error.message);
    } else {
      this.ErrorMsg.set(error.error.message);
    }
    return throwError(error);
  };
}
