import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StateView } from '../_models/state_view';
import { User } from '../_models/user';


/**
 * This constant tells us that the REST request must be JWT authorized
 * There is an extra header that just says validate=yes that tells us
 * to intercept us. This header is also removed before it gets sent
 * to Django as Django doesn't like the extra headers.
 */

export const VALIDATE = 'validate'

const httpValidateOptions = {
    headers: new HttpHeaders({
        validate: VALIDATE
    })
};

@Injectable({
    providedIn: 'root'
})
export class DataService {

    API_URL = environment.API_URL;

    constructor(private httpClient: HttpClient) { }


    public getStates(url: string): Observable<any> {
        return this.httpClient.get(url, httpValidateOptions).
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
        return this.httpClient.get<Response>(url, httpValidateOptions).
            pipe(
                map((data: Response): Response => {
                    return data;
                }), catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            )
    }
    // Specific get for a state
    public filterStates(animal: string): Observable<any> {
        return this.httpClient.get<Response>(this.API_URL + '/states?animal=' + animal).
            pipe(
                map((data: Response) => {
                    return data;
                }), catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            )
    }

    /** POST: add a new StateView to the database */
    public addStateView(stateView: StateView[]): Observable<number> {
        return this.httpClient.post<number>(this.API_URL + '/createstate', stateView, httpValidateOptions)
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

