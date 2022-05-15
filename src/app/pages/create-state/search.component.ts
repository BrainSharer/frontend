import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { State } from 'src/app/_models/state';
import { StateView } from 'src/app/_models/state_view';
import { DataService } from 'src/app/_services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit  {
  public isCollapsed = -1;
  states: StateView[] = [];
  subStates: StateView[] = [];
  animals : string[] = [];
  baseUrl = environment.API_URL;
  ngUrl = environment.NG_URL;
  animalUrl = this.baseUrl + '/animal'
  stateUrl = this.baseUrl + '/states'

  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.setData(this.stateUrl);
  }

  public searchForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    atlas: new FormControl(''),
  });


  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText: string = '';


  public search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }


  public onReset(): void {
    this.searchForm.reset();
    this.groupFilters.emit('');
  }

  setData(url: string) {
    this.dataService.getData(url).subscribe(response => {
      this.states = response.results;
      this.animals = Array.from(new Set(response.results.map((x:StateView) => x.group_name)));
    });
  }

  public fetchData(event: any, i: number, animal: string) {
    this.isCollapsed = i;
    /*
    this.dataService.getStateByAnimal(animal).subscribe(response => {
      this.states = response.results;
    });
    */
    this.subStates = this.states.filter(element => {
      return element.group_name == animal;
    })
  }

}