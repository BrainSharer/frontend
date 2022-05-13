import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { DataService } from '../_services/data.service';
import { State } from '../_models/state';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: State[] = [];
  baseUrl = environment.API_URL;
  apiUrl = this.baseUrl + '/neuroglancer'
  ngUrl = environment.NG_URL;
  next: string = '';
  previous: string = '';
  numberOfPages: number = 0;

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
  });

  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.setData(this.apiUrl);
  }

  search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }

  private setData(url: string) {
    this.dataService.getData(url).subscribe(response => {
      this.data = response.results;
      this.numberOfPages = response.count;

      if (response.next) {
        this.next = response.next;
      }

      if (response.previous) {
        this.previous = response.previous;
      }

    });
  }

  // function fetches the next paginated items by using the url in the next property
  public fetchNext() {
    this.setData(this.next);
  }

  // function fetches the previous paginated items by using the url in the previous property
  public fetchPrevious() {
    this.setData(this.previous);
  }



}
