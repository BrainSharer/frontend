import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StateView } from '../models/state_view';
import { User } from '../models/user';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
    })
};

@Injectable({
    providedIn: 'root'
})
export class DataService {

    baseUrl = environment.API_URL;

    constructor(private http: HttpClient) { }


    public getStates(url: string): Observable<any> {
        return this.http.get(url).
            pipe(
                map((data: any) => {
                    return data;
                }), catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            )
    }
    // Generic get. Can be used by any url as it returns any
    public getData(url: string): Observable<any> {
        return this.http.get(url).
            pipe(
                map((data: any) => {
                    return data;
                }), catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            )
    }

    // StateView POST
    /** POST: add a new StateView to the database */
    public addStateView(stateView: StateView[]): Observable<number> {
        console.log('addStateView' + stateView);
        return this.http.post<number>(this.baseUrl + '/createstate', stateView, httpOptions)
            .pipe(
                catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            );
    }

    public getCurrentUser(): any {
        return this.http.get<User>(this.baseUrl + '/session');
    }

    public validateEmail(email: string): any {
        return this.http.get<any>(this.baseUrl + '/validate?email=' + email);
    }

    public validateUsername(username: string): any {
        return this.http.get<any>(this.baseUrl + '/validate/?username=' + username);
    }

    public register({ userData }: { userData: User; }): Observable<User> {
        return this.http.post<User>(this.baseUrl + '/register/', userData);
    }
    
}

