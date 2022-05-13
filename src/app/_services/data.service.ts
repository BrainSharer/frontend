import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StateView } from '../_models/state_view';
import { User } from '../_models/user';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
    })
};

const headers = new HttpHeaders()
    .append(
        'Content-Type',
        'application/json'
    );

@Injectable({
    providedIn: 'root'
})
export class DataService {

    API_URL = environment.API_URL;

    constructor(private httpClient: HttpClient) { }


    public getStates(url: string): Observable<any> {
        return this.httpClient.get(url).
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
        return this.httpClient.get(url).
            pipe(
                map((data: any) => {
                    return data;
                }), catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            )
    }

    /** POST: add a new StateView to the database */
    public addStateView(stateView: StateView[]): Observable<number> {
        return this.httpClient.post<number>(this.API_URL + '/createstate', stateView, httpOptions)
            .pipe(
                catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            );
    }


    public findByEmail(email: string): Observable<any> {
        return this.httpClient.get<any>(this.API_URL + '/validate/?email=' + email)
            .pipe(
                map((response: Response) => {
                    return response;
                }), catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            )
    }

    public findByUsername(username: string): Observable<any> {
        return this.httpClient.get<any>(this.API_URL + '/validate/?username=' + username)
            .pipe(
                map((response: Response) => {
                    return response;
                }), catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            )
    }


    public register({ userData }: { userData: User; }): Observable<User> {
        return this.httpClient.post<User>(this.API_URL + '/register/', userData);
    }

}

