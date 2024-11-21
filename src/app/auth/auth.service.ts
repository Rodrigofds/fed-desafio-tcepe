import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/signin';

  constructor(private http: HttpClient) {}

  signin(login: string, password: string): Observable<{ token: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      login,
      password
    };

    return this.http.post<{ token: string }>(this.apiUrl, body, { headers }).pipe(
      tap(response => {
        if (response.token) {
          this.storeToken(response.token);
        } else {
          alert('Login ou password inválida(s)');
        }
      })
    );
  }

  storeToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
}
