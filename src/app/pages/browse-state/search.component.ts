import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  public searchForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    lab: new FormControl(''),
  });

  labs = [
    "Princeton",
    "UCSD",
  ];

  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText: string = '';
  constructor() { }

  public search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    console.log(filters);
    this.groupFilters.emit(filters);
  }


  public onReset(): void {
    this.searchForm.reset();
    this.groupFilters.emit('');
  }

}