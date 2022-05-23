import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotificationService } from './notification';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = false;
  private sessionActive = new BehaviorSubject<boolean>(this.tokenAvailable());
  public user: User = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: ''
  };
  public errors: any = [];
  public token_expires: Partial<Date> = {};
  private token: string = "";
  API_URL = environment.API_URL;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private httpClient: HttpClient,
    private notificationService: NotificationService) { }

  public login(username: string, password: string): any {
    return this.httpClient.post<any>(this.API_URL + '/api-token-auth/', { username: username, password: password }, httpOptions)
      .pipe(map(data => {
        if (data && data['token']) {
          this.sessionActive.next(true);
          this.updateData(data);
          this.updateUser(username);
          this.isLoggedIn = true;
        } else {
          console.log("No data returned from login.")
        }
        return data;
      }));
  }

  public getDjangoUser(): any {
    return this.httpClient.get<User>(this.API_URL + '/session');
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
        next: (user: User) => {
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

  private updateData(token: any): void {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  // this doesn't work on the Django end
  private refreshToken(): void {
    this.token = sessionStorage.getItem('token') || '{}';
    console.log(this.token);
    this.httpClient.post(this.API_URL + '/api-token-refresh/', JSON.stringify({ token: this.token }), httpOptions)
      .subscribe({
        next: (data: any) => {
          console.log('in refresh ' + data);
          this.updateData(data);
        },
        error: (err: any) => {
          this.errors = err['error'];
        }
      });
  }

  private tokenAvailable(): boolean {
    return !!sessionStorage.getItem('token');
  }

  public checkLoginStatus(): Observable<boolean> {
    console.log('checking login status');    
    if (this.user.id === 0) {
      console.log('user is NOT defined, fetching from Django');
      let data = this.cookieService.get('user');
      console.log(data);
      data = data.replace(/\\054/g, ',');
      this.user = JSON.parse(data);
      console.log(this.user);
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.sessionActive = new BehaviorSubject<boolean>(true);
      this.isLoggedIn = true;
    }
    const loggedInStatus = this.sessionActive.asObservable();
    return loggedInStatus;
  }

  public checkLoginStatusXXXX(): Observable<boolean> {
    console.log('checking login status');    
    if (this.user.id === 0) {
      console.log('user is NOT defined, fetching from Django');
      this.getDjangoUser()
      .subscribe({
        next: (user:User) => {
          this.user = user;
          console.log(this.user);
          sessionStorage.setItem('user', JSON.stringify(user));
          this.sessionActive = new BehaviorSubject<boolean>(true);
          this.isLoggedIn = true;
        },
        error: (err: any) => {
          this.errors = err['error'];
          console.log(this.errors);
        }
      });
    }
    const loggedInStatus = this.sessionActive.asObservable();
    return loggedInStatus;
  }


  public logout(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.sessionActive = new BehaviorSubject<boolean>(false);
    this.notificationService.showWarning('You have been logged out', 'Success');
    this.router.navigate(['/']);
  }


  /*
  public getExpiration() {
    return moment(this.token_expires);
  }

  public get isTokenActive() {
    return moment().isBefore(this.getExpiration());
  }
  */


}