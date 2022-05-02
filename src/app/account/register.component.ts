import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    register: any;
    baseUrl = environment.API_URL;
    apiUrl = this.baseUrl + '/users'
  
    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.register = {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password2: '',
        }
    }

    public registerUser() {
        this.dataService.registerUser(this.register).subscribe(
            response => {
                console.log(response);
            }
        )
    }

}
