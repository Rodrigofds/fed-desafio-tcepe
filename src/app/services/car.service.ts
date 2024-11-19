import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars';

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl).pipe(
      tap(data => console.log('Received cars:', data)),
      catchError(error => {
        console.error('Error fetching cars:', error);
        return of([]);
      })
    );
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log('Fetched car:', data)),
      catchError(error => {
        console.error('Error fetching car:', error);
        return of(error);
      })
    );
  }


  createCar(car: Car): Observable<Car | null> {
    return this.http.post<Car>(this.apiUrl, car).pipe(
      tap(createdCar => console.log('Car created:', createdCar)),
      catchError(error => {
        console.error('Error creating car:', error);
        return of(error);
      })
    );
  }


  updateCar(id: number, car: Car): Observable<Car | null> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car).pipe(
      tap(updatedCar => console.log('Car updated:', updatedCar)),
      catchError(error => {
        console.error('Error updating car:', error);
        return of(error);
      })
    );
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(response => console.log('Car deleted:', response)),
      catchError(error => {
        console.error('Error deleting car:', error);
        return of(error);
      })
    );
  }
}
