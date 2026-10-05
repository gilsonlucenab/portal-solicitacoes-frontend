import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

interface CsrfToken {
  token: string;
  parameterName: string;
  headerName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {

    return this.http.get<CsrfToken>(
      `${this.apiUrl}/api/auth/csrf`,
      {
        withCredentials: true
      }
    ).pipe(

      switchMap((csrf) => {

        const body = new URLSearchParams();

        body.set('username', username);
        body.set('password', password);

        return this.http.post(
          `${this.apiUrl}/login`,
          body.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              [csrf.headerName]: csrf.token
            },
            withCredentials: true,
            responseType: 'text'
          }
        );

      })

    );
  }

  logout(): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': this.getCsrfToken()
        },
        responseType: 'text'
      }
    );
  }

  private getCsrfToken(): string {

    const cookies = document.cookie.split(';');

    const csrfCookie = cookies.find(cookie =>
      cookie.trim().startsWith('XSRF-TOKEN=')
    );

    if (!csrfCookie) {
      return '';
    }

    return decodeURIComponent(
      csrfCookie.split('=')[1]
    );
  }
}
