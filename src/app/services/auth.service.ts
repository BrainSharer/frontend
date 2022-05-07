import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotificationService } from '../services/notification';

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
  public user: User = {
    id:0, 
    username:'',
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    password2:''};
  public errors: any = [];
  public token_expires: Partial<Date> = {};
  private token: string = "";
  API_URL = environment.API_URL;

  constructor(
    private router: Router,
    private httpClient: HttpClient, 
    private notificationService: NotificationService) { }

  public login(username: string, password: string): any {
    return this.httpClient.post<any>(this.API_URL + '/login', { username: username, password: password }, httpOptions)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data['token']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.token = data['token'];
          this.sessionActive.next(true);
          this.updateData(this.token);
          this.updateUser(username);
        } else {
          console.log("No data returned from login.")
        }
        return data;
      }));
  }

  public getSessionUser(): User | null {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}')
    return user;
  }

  public getFullname(): string {
    const user = this.getSessionUser();
    let fullname = '';
    if ((user?.first_name) && (user?.last_name)) {
      fullname = `${user.first_name} ${user.last_name}`
    }
    return fullname;
  }

  private updateUser(username: string): void {
    this.getCurrentUser(username)
    .subscribe({
      next: (user:User) => {
        sessionStorage.setItem('user', JSON.stringify(user));
      },
      error: (msg: Error) => {
        this.notificationService.showError(msg.message, 'Error fetching user.');
      }
    });


  }

  private getCurrentUser(username: string): any {
    return this.httpClient.get<User>(this.API_URL + '/user/' + username);
}


  /*
  public getExpiration() {
    return moment(this.token_expires);
  }

  public get isTokenActive() {
    return moment().isBefore(this.getExpiration());
  }
  */

  private updateData(token: any): void {
    this.token = token;
    this.errors = [];
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    sessionStorage.setItem('token', token);
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken(): void {
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
    return !!sessionStorage.getItem('token');
  }

  public getDjangoUser(): any {
    return this.httpClient.get<User>(this.API_URL + '/session');
}

  public get isLoggedIn(): Observable<boolean> {
    if (this.user.id === 0) {
      console.log('user is NOT defined, fetching from Django');
      this.getDjangoUser()
      .subscribe({
        next: (user:User) => {
          this.user = user;
          sessionStorage.setItem('user', JSON.stringify(user));
          this.sessionActive = new BehaviorSubject<boolean>(true);
        },
        error: (err: any) => {
          this.errors = err['error'];
        }
      });
    }
    const loggedInStatus = this.sessionActive.asObservable();
    return  loggedInStatus;
  }



  public logout(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.sessionActive = new BehaviorSubject<boolean>(false);
    this.notificationService.showWarning('You have been logged out','Success');
    this.router.navigate(['/home']);
  }

}