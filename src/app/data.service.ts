import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { State } from './models/state';
import { StateView } from './models/state_view';
import { User } from './models/user';

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


    public getStates(): Observable<State[]> {
        return this.http.get(this.baseUrl + '/neuroglancer').
            pipe(
                map((data: any) => {
                    return data['results'];
                }), catchError(error => {
                    return throwError(() => new Error('Error: ' + error))
                })
            )
    }
    // StateView GET 
    public getStateViews(): Observable<StateView[]> {
        return this.http.get(this.baseUrl + '/states').
            pipe(
                map((data: any) => {
                    return data['results'];
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
    
}

