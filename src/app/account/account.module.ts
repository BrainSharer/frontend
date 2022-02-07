import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        RecaptchaModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }