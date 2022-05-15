import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { environment } from 'src/environments/environment';
import { State } from '../../_models/state';

@Component({
  selector: 'app-create-state-list',
  templateUrl: './create-state-list.component.html',
  styleUrls: ['./create-state-list.component.css']
})
export class CreateStateListComponent implements OnChanges {
  @Input() groupFilters: Object = new Object;
  @Input() searchByKeyword: string = '';
  filteredStates: any[] = [];
  baseUrl = environment.API_URL;
  apiUrl = this.baseUrl + '/neuroglancer'
  data: State[] = [];
  next: string = '';
  previous: string = '';
  numberOfPages: number = 0;
  ngUrl = environment.NG_URL;


  constructor(
    private dataService: DataService) { }
  
    ngOnInit(): void {
    this.setData(this.apiUrl);
  }
  
  ngOnChanges(): void {
    // if (this.groupFilters) this.filterStateList(this.groupFilters, this.data);
    this.filterStateList(this.groupFilters, this.data);
  }
  
  private filterStateList(filters: any, states: any): void {
    this.filteredStates = this.data; //Reset State List
    const keys = Object.keys(filters);
    const filterState = (state:any) => {
      let result = keys.map(key => {        
          if (state[key]) {
            return String(state[key]).toLowerCase().includes(String(filters[key]).toLowerCase())
          } else {
            return false;
          }
      });
      // To Clean Array from undefined if the age is passed so the map will fill the gap with (undefined)
      result = result.filter(it => it !== undefined);
      return result.reduce((acc, cur: any) => { return acc & cur }, 1)
    }
    this.filteredStates = this.data.filter(filterState);
  }

  public setData(url: string): void {
    this.dataService.getData(url).subscribe(response => {
      this.data = response.results;
      this.numberOfPages = response.count;

      if (response.next) {
        this.next = response.next;
      }

      if (response.previous) {
        this.previous = response.previous;
      }
      // this.filteredStates = this.filteredStates.length > 0 ? this.filteredStates : this.data;
      this.filteredStates = this.data;
    });
  }

  // function fetches the next paginated items by using the url in the next property
  public fetchNext(): void {
    this.setData(this.next);
  }

  // function fetches the previous paginated items by using the url in the previous property
  public fetchPrevious(): void {
    this.setData(this.previous);
  }

}