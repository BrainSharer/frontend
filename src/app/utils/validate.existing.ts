import { AbstractControl, AsyncValidatorFn, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';

export class UsernameValidator {
    static createValidator(dataService: DataService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return dataService.validateUsername(control.value)
                .pipe(
                    map((response: any) => {
                        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx');
                        const c = response['count'];
                        return c === '1' ? { existing: true } : null;
                    })
                );
        };
    }
    static createValidatorvvv(dataService: DataService): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return dataService.validateUsername(control.value)
                .pipe(
                    map((response: any) => {
                        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx');
                        const c = response['count'];
                        return c === '1' ? { existing: true } : null;
                    })
                );
        };
    }

}