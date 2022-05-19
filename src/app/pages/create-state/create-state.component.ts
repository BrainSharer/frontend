import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { GroupView, StateView } from 'src/app/_models/state_view';
import { DataService } from 'src/app/_services/data.service';
import { environment } from 'src/environments/environment';

/* This overrides the set so you can actually compare objects.
It uses the JSON.stringify to get the objects in a common
object type
*/
class GroupSet<T> extends Set<T> {
  override add(value: T): this {
      let found = false;
      this.forEach(item => {
          if (JSON.stringify(value) === JSON.stringify(item)) {
              found = true;
          }
      });
      if (!found) {
          super.add(value);
      }
      return this;
  }
}



@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {
  states: StateView[] = [];
  public selectedStates: StateView[] = [];
  groups : StateView[] = [];
  baseUrl = environment.API_URL;
  ngUrl = environment.NG_URL;
  url_ID = 0;
  animalUrl = this.baseUrl + '/animal'
  stateUrl = this.baseUrl + '/states'
  groupUrl = this.baseUrl + '/groups'
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
      this.groups = Array.from(new GroupSet(response.results.map((x: GroupView) => new GroupView(x.group_name, x.layer_type))));
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