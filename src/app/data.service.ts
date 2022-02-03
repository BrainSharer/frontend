import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private httpClient: HttpClient) { }

  getStates(){
    return this.httpClient.get(`https://brainsharer.org/brainsharer/neuroglancer`);
  }
}