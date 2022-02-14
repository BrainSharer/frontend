import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { State } from './models/state';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    baseUrl = environment.API_URL;

    constructor(private http: HttpClient) { }


    getStates(): Observable<State[]> {
        const url = this.baseUrl + '/neuroglancer';
        return this.http.get(url).
            pipe(
                map((data: any) => {
                    return data['results'];
                }), catchError(error => {
                    return throwError('Something went wrong!' + error);
                })
            )
    }

}