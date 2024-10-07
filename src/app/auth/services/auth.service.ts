import { LoginResponse } from './../interfaces/login-response.interface';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, pipe, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AuthStatus, CheckTokenResponse } from '../interfaces';
import { RegisterPayload } from '../interfaces/register-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient)

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);


  // Al exterior (cualquier cosa que este fuera del servicio)
  public currentUser = computed(() => this._currentUser())
  public authStatus = computed(() => this._authStatus())


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token)

    return true;
  }


  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))
      );
  }


  register(user: User): Observable<boolean> {

    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<RegisterPayload>(url, user)
    .pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError(err => throwError(() => err.error.message))
    )

  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);


    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );

  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);

  }

}
