import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    baseUrl = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  getStates(){
    const url = this.baseUrl + '/neuroglancer';
    return this.httpClient.get(url);
  }
}