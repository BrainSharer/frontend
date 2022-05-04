import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, 
    Validators, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { NotificationService } from '../services/notification';
import Validation from '../utils/validation';
import { UsernameValidator } from '../utils/validate.existing';
import { map, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    addForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        password2: new FormControl('')
    });
    loading = false;
    submitted = false;

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private dataService: DataService,
        private notificationService: NotificationService,

    ) { }

    ngOnInit() {
        this.addForm = this.formBuilder.group(
            {
                username: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(20),
                        UsernameValidator.createValidator(this.dataService)
                    ]
                ],
                first_name: ['', Validators.required],
                last_name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(40)
                    ]
                ],
                password2: ['', Validators.required]
            },
            {
                validators: [Validation.match('password', 'password2')]
            }
        );
    }


    get f(): { [key: string]: AbstractControl } {
        return this.addForm.controls;
    }

    onReset(): void {
        this.submitted = false;
        this.addForm.reset();
    }

    register(): void {
        this.submitted = true;
        if (this.addForm.invalid) {
            return;
        }
        this.dataService.register({ userData: this.addForm.value })
            .subscribe({
                next: () => {
                    this.notificationService.showSuccess('Registration was successful','Success');
                    this.router.navigate(['/account/login']);
                },
                error: (msg) => {
                    this.notificationService.showError(msg.message,'Error');
                }
            });
    }
}
