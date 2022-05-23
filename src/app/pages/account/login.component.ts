import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../_services/auth.service';
import { NotificationService } from '../../_services/notification';
import { environment } from '../../../environments/environment';



const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
].join(' ');

const params = {
  response_type: 'code',
  client_id: '821517150552-71h6bahua9qul09l90veb8g3hii6ed25.apps.googleusercontent.com',
  redirect_uri: environment.GOOGLE_URL,
  prompt: 'select_account',
  access_type: 'offline',
  scope
};




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public captchaResolved: boolean = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
      ]
    }),
  });

  submitted: boolean = false;
  loading: boolean = false;
  checkCaptcha(captchaResponse: string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }

  google_url = environment.GOOGLE_URL;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }


  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Login was successful', 'Success');
          this.router.navigate(['/home']);
        },
        error: (msg: Error) => {
          this.notificationService.showError(msg.message, 'Error logging in with those credentials');
        }
      });
  }

  public clickGoogle() {
    const urlParams = new URLSearchParams(params).toString();
    window.location.href = `${googleAuthUrl}?${urlParams}`;
 
  }


}
