import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    })
  }


  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  getCall(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params }).pipe(catchError(this.formatErrors));
  }

  postCall(path: string, formData: FormData): Observable<any> {
    return this.http.post(path, formData).pipe(catchError(this.formatErrors));
  }

  putCall(path: string, body: object = {}): Observable<any> {
    return this.http.put(path, JSON.stringify(body), this.httpOptions).pipe(catchError(this.formatErrors));
  }

  deleteCall(path: string): Observable<any> {
    return this.http.delete(path).pipe(catchError(this.formatErrors))
  }
}
