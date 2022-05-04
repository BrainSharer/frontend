import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { User } from '../models/user';
import { DataService } from '../services/data.service';

export class ValidateEntry {

    user!: User;

    constructor(private dataService: DataService) { }

    /*
    this.dataService.getData(url).subscribe(response => {
        this.data = response.results;
        this.numberOfPages = response.count;
        console.log(this.numberOfPages);
    */

    /** A user's name/email can't exist already in the database */
    static existingEntryValidator(): ValidatorFn {

      

        return (control: AbstractControl): ValidationErrors | null => {

            const existing = "xxxx";

            if (control?.value === existing) {
                return { existing: true };
            } else {
                return null;
            }

        };
    }

}
