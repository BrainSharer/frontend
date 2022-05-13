import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { User } from '../_models/user';
import { AuthService } from './auth.service';

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


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (sessionStorage.getItem('user')) {
      this.authService.user = this.user;
      this.setExpiration();
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/home']);
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
