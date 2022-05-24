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
    console.log('AuthGuard::canActivate user=' + JSON.stringify(this.user));
    if ((this.user) && (this.user.id > 0)){
      this.authService.user = this.user;
      return true;
    } 
    // not logged in so redirect to login page with the return url
    this.notificationService.showError('Error', 'You do not have access to that page.');
    this.router.navigate(['/account/login']);
    return false;
  }

}
