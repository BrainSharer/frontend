import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { User } from 'src/app/_models/user';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  private user: User = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: ''
  };


  constructor(
    private authService: AuthService,
    private cookieService: CookieService) { }

  canActivate(): boolean {
    let user_id = this.cookieService.get('id');
    let username = this.cookieService.get('username');
    let first_name = this.cookieService.get('first_name');
    let last_name = this.cookieService.get('last_name');
    let email = this.cookieService.get('email');
    if (user_id) {
      this.user = {'id': +user_id, 'username': username, 'first_name': first_name, 'last_name': last_name, 'email': email, 'password':'', 'password2': ''};
      this.authService.user = this.user;
    } else {
      console.log('LoginGuard::canActivate: No cookie and no storage user')
    }
    return true;
  }
}
