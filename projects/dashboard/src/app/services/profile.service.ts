import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TweetForInitialCredibility } from '../models/TweetForInitialCredibility';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {  
    heroku = environment.malithHerokuApiUrl;
    test = environment.malithTestApiUrl;
    baseUrl=this.test;
  constructor(private http: HttpClient) { }

  getUserProfileService(username: string) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const options = { headers };
    console.log(username);
    // console.log('model', model);
    return this.http.get<any>(this.baseUrl + 'getUserProfile/' + username, options).pipe(map(response => response))
    .pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    // console.log('error', error);
    if (error.status === 404) {
      return throwError('No user matches for specified screen name');
    }
    if (error.status === 400) {
      return throwError(error.error.message);
    }
    if (error.status === 500) {
      return throwError('Server error occured, please try again');
    }
  }
  }
  export class GetTwitterUserService {
    heroku = environment.malithHerokuApiUrl;
    test = environment.malithTestApiUrl;
    baseUrl=this.test;
  
  constructor(private http: HttpClient) { }
  
  getUsetProfileService(username: string) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const options = { headers };
    // console.log('model', model);
    return this.http.get<any>(this.baseUrl + 'getUserProfile/' + username, options).pipe(map(response => response))
    .pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    // console.log('error', error);
    if (error.status === 404) {
      return throwError('No user matches for specified screen name');
    }
    if (error.status === 400) {
      return throwError(error.error.message);
    }
    if (error.status === 500) {
      return throwError('Server error occured, please try again');
    }
  }
  }
  
