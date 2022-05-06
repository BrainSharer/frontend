import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionActive = new BehaviorSubject<boolean>(this.tokenAvailable());
  public user: Partial<User> = {};
  public errors: any = [];
  public token_expires: Partial<Date> = {};
  private token: string = "";
  API_URL = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string) {
    return this.httpClient.post<any>(this.API_URL + '/login', { username: username, password: password }, httpOptions)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data['token']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.token = data['token'];
          this.sessionActive.next(true);
          this.updateData(this.token);
          sessionStorage.setItem('username', username);
        } else {
          console.log("No data returned from login.")
        }
        return data;
      }));
  }

  public getUsername() {
    console.log('username ' + sessionStorage.getItem('username'));
    return sessionStorage.getItem('username');
  }

  /*
  public getExpiration() {
    return moment(this.token_expires);
  }

  public get isTokenActive() {
    return moment().isBefore(this.getExpiration());
  }
  */

  private updateData(token: any) {
    this.token = token;
    this.errors = [];
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    sessionStorage.setItem('token', token);
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.token = sessionStorage.getItem('token') || '{}';
    this.httpClient.post(this.API_URL + '/api-token-refresh/', JSON.stringify({ token: this.token }), httpOptions)
    .subscribe({
      next: (data:any) => {
        this.updateData(data['token']);
      },
      error: (err: any) => {
        this.errors = err['error'];
      }
    });
  }

  private tokenAvailable(): boolean {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return !!sessionStorage.getItem('token');
  }

  public get isLoggedIn() {
    return this.sessionActive.asObservable(); // {2}
  }

  public logout() {}

}