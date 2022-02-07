import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    constructor() { }

    ngOnInit(): void {
    }

}
