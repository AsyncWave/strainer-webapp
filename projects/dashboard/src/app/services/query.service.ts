import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  twitter = environment.twitterApiUrl;

  constructor(private http: HttpClient) { }

  checkExists(screenName) {
    let options = null;
    const queryString = screenName;

    const headers = new HttpHeaders({'Content-type': 'application/json'});
    options = { headers };
    return this.http.get<any>(this.twitter + 'exists/' + queryString, options).pipe(map(response => response))
    .pipe(
      catchError(this.handleError)
    );
  }

  sendQuery(model: any) {

  }

  private handleError(error: any) {
    if (error.status === 404) {
      return throwError('No user matches for specified screen name');
    }
    // if (error.status === 401) {
    //   // this.router.navigate(['/home']);
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('user');
    //   localStorage.removeItem('isAdmin');
    //   return throwError('Please login again!');
    // }
    // const applicationError = error.error.message;
    // if (applicationError) {
    //   // this.router.navigate(['/home']);
    //   // localStorage.removeItem('token');
    //   // localStorage.removeItem('user');
    //   // localStorage.removeItem('isAdmin');
    //   return throwError(applicationError + ', check for possible mistakes');
    // }
    // const serverError = error.error.modelState;
    // let modelStateErrors = '';
    // if (serverError) {
    //   for (const key in serverError) {
    //     if (serverError[key]) {
    //       modelStateErrors += serverError[key] + '\n';
    //     }
    //   }
    // }
    // return throwError(modelStateErrors || 'Server error');
  }
}
