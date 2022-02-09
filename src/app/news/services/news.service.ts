import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpService: HttpClient) { }

  public getNews(query:string,page:number): Observable<any[]> {

    return this.httpService.get<any[]>(`${environment.api_url}/search_by_date?query=${query}&page=${page}`).pipe(
      map((request: any[]) => {
        return request
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage: any = {};

    if (err.error instanceof ErrorEvent) {
      errorMessage = {
        message: `An error occurred: ${err.error.message}`,
        code: err.status
      };
    } else {
      errorMessage = {
        message: err
      };
    }
    return throwError(errorMessage);
  }

}
