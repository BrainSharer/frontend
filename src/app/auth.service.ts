import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    headers: string = "";
    // private userSubject: BehaviorSubject<User> | undefined;
    public user: User | undefined;

    constructor(private dataService: DataService) {
        // this.userSubject = new BehaviorSubject<User>(this.dataService.getCurrentUser());
        // this.state = this.dataService.getCurrentUser();
        // this.user = this.userSubject.asObservable();


    }
    /*
     public get userValue(): User {
        console.log('this.userSubject.value ' + this.userSubject.value);
        return this.userSubject.value;
    }
    */

}