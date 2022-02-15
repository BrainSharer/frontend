import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { State } from './models/state';
import { User } from './models/user';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    baseUrl = environment.API_URL;

    constructor(private http: HttpClient) { }


    getStates(): Observable<State[]> {
        return this.http.get(this.baseUrl + '/neuroglancer').
            pipe(
                map((data: any) => {
                    return data['results'];
                }), catchError(error => {
                    return throwError('Something went wrong!' + error);
                })
            )
    }


    getCurrentUser(): any {
        return this.http.get<User>(this.baseUrl + '/session');
    }
    
}