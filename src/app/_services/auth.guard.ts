import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { User } from 'src/app/_models/user';
import { AuthService } from './auth.service';
import { NotificationService } from 'src/app/_services/notification';

@Injectable()
export class AuthGuard implements CanActivate {
  private user: User = {
    id:0, 
    username:'',
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    password2:''};


  constructor(
    private authService: AuthService,
    private notificationService: NotificationService, 
    private router: Router) { }

  canActivate(): boolean {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if ((this.user) && (this.user.id > 0)){
      this.authService.user = this.user;
      console.log('Got valid session user');
      this.setExpiration();
      return true;
    } 
    // not logged in so redirect to login page with the return url
    this.notificationService.showError('Error', 'You do not have access to that page.');
    this.router.navigate(['/account/login']);
    return false;
  }

  private setExpiration() {
    let token = sessionStorage.getItem('token');
    if (token) {
      const token_parts = token.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
      const token_expires = new Date(token_decoded.exp * 1000);
      this.authService.token_expires = token_expires;
    }
  }



}
