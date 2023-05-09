import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRequest } from '../core/models/ServiceRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsControllerService<T> {

  private urApi: string = environment.apiURL;
  constructor(private http: HttpClient) { }

  getElement(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(this.urApi + endpoint);
  }

  getOneElement(endpoint: string, id: string): Observable<T> {
    return this.http.get<T>(this.urApi + endpoint + '/' + id);
  }

  saveElement(endpoint: string, element: T): Observable<T> {
    console.table(element);
    return this.http.post<T>(this.urApi + endpoint, element).pipe(
      catchError((error: HttpErrorResponse): Observable<any> => {
        console.error('There was an error!', error);
        return throwError(() => new Error(this.getServerErrorMessage(error)));
      })
    )
  }

  updateElement(endpoint: string, element: T, id: number): Observable<T> {
    console.table(element);
    return this.http.put<T>(this.urApi + endpoint + '/' + id, element).pipe(
      catchError((error: HttpErrorResponse): Observable<any> => {
        console.error('There was an error!', error);
        return throwError(() => new Error(this.getServerErrorMessage(error)));
      })
    )
  }

  deleteElement(endpoint: string, id: number): Observable<T> {
    return this.http.delete<T>(this.urApi + endpoint + '/' +  id).pipe(
      catchError((error: HttpErrorResponse): Observable<any> => {
        console.error('There was an error!', error);
        return throwError(() => new Error(this.getServerErrorMessage(error)));
      })
    )
  }

  //POST -> https://localhost:7204/api/User/login  Retorna -> Token
  authenticateElement(endpoint: string, element: T): Observable<T> {
    return this.http.post<T>(this.urApi + endpoint+ '/login', element).pipe(
      catchError((error: HttpErrorResponse): Observable<T> => {
        console.error('There was an error!', error);
        return throwError(() => new Error(this.getServerErrorMessage(error)));
      })
    )
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 400: {
        return `Bad Request: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
