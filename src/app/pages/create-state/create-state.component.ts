import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {CdkAccordionModule} from '@angular/cdk/accordion';

import { StateView } from 'src/app/_models/state_view';
import { DataService } from 'src/app/_services/data.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {
  states: StateView[] = [];
  public selectedStates: StateView[] = [];
  animals : string[] = [];
  baseUrl = environment.API_URL;
  ngUrl = environment.NG_URL;
  url_ID = 0;
  animalUrl = this.baseUrl + '/animal'
  stateUrl = this.baseUrl + '/states'
  next: string = '';
  previous: string = '';
  numberOfPages: number = 0;
  searchForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    atlas: new FormControl(''),
  });

  constructor(
    private dataService: DataService
    ) { }

    ngOnInit(): void {
    this.setData(this.stateUrl);
    }


  private setData(url: string): void {

    this.dataService.getData(url).subscribe(response => {
      this.states = response.results;
      this.animals = Array.from(new Set(response.results.map((x: StateView) => x.group_name)));
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
  public fetchNext(): void {
    this.setData(this.next);
  }

  // function fetches the previous paginated items by using the url in the previous property
  public fetchPrevious(): void {
    this.setData(this.previous);
  }


  public toggleRightSide(isToggled: boolean, state_id: number): void {
    
    let state = this.states.filter(element => {
      return element.id == state_id;
    })

    if (isToggled) {
      this.selectedStates.push(state[0]);

    } else {
      for (let i in this.selectedStates) {
        let index: number = this.selectedStates.indexOf(state[0]);
        if (index !== -1) {
          this.selectedStates.splice(index, 1);
        }
      }
    }
  }

  onSubmit() {
    if (this.selectedStates.length > 0) {
      this.dataService.addStateView(this.selectedStates)
        .subscribe({
          next: (res) => {
            this.url_ID = res;
            const redirecturl = this.ngUrl + '?id=' + this.url_ID;
            window.location.href = redirecturl;
          },
          error: (e) => console.error(e)
        });
    }
  }


}