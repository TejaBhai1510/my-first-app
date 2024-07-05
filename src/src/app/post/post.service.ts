import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = 'https://jsonplaceholder.typicode.com/posts';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
create(post:Post):Observable<any>{
  return this.httpClient.post(this.apiURL
    + '/posts/',JSON.stringify(post),this.httpOptions)
    .pipe(catchError(this.errorHandler)
  )
}

find(id:number): Observable<any>{
  return this.httpClient.get(this.apiURL + '/posts/' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:number,post:Post): Observable<any>{
  return this.httpClient.put(this.apiURL+ '/posts/'+id, 
    JSON.stringify(post),
this.httpOptions)
.pipe(catchError(this.errorHandler)
)
}

delete (id:number){
  return this.httpClient.delete(this.apiURL + '/posts/' + id ,this.httpOptions)
  .pipe(catchError(this.errorHandler))
}


  private errorHandler(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
