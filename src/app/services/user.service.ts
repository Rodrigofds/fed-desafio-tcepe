import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/user';
import { UserSubmit } from '../models/user-submit';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.httpOptions)
    .pipe(
      tap(data => {
        console.log('Received data:', data);
      }),
      catchError(error => {
        console.error('Error to get a user list:', error);
        return of([]);
      })
    );
  }

  createUser(user: UserSubmit): Observable<User | null> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, user, { headers }).pipe(
      tap(createdUser => {
        console.log('User created:', createdUser);
      }),
      catchError(error => {
        console.error('Error to create user:', error);
        return of(null);
      })
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  updateUser(id: number, user: any): Observable<User | null> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user, this.httpOptions);
  }
}
