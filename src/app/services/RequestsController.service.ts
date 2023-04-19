import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsControllerService<T> {

  private urApi: string = environment.apiURL;
  constructor(private http: HttpClient) { }

  getElement(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(this.urApi + endpoint).pipe(
      catchError((error: HttpErrorResponse): Observable<any> => {
        console.error('There was an error!', error);
        return throwError(() => new Error(this.getServerErrorMessage(error)));
      })
    )
  }

  saveElement(endpoint: string, element: T): Observable<T> {
    return this.http.post<T>(this.urApi + endpoint, element).pipe(
      catchError((error: HttpErrorResponse): Observable<any> => {
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
