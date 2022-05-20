import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { GroupView, StateView } from 'src/app/_models/state_view';
import { GroupSet } from 'src/app/_models/group.set';
import { Lab } from 'src/app/_models/lab';
import { DataService } from 'src/app/_services/data.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {
  labs: Lab[] = [];
  states: StateView[] = [];
  public selectedStates: StateView[] = [];
  groups : StateView[] = [];
  baseUrl = environment.API_URL;
  ngUrl = environment.NG_URL;
  url_ID = 0;
  animalUrl = this.baseUrl + '/animal';
  labUrl = this.baseUrl + '/labs';
  stateUrl = this.baseUrl + '/states';
  next: string = '';
  previous: string = '';
  numberOfResults: number = 0;
  searchForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    labs: new FormControl(''),
    layer_types: new FormControl('')
  });

  layer_types = [
    { id: '', name: 'All' },
    { id: 'segmentation', name: '3D volume' },
    { id: 'image', name: 'Image stack' },
  ]

  constructor(
    private dataService: DataService
    ) { }

    ngOnInit(): void {
      this.setData(this.stateUrl);
      this.setLabs(this.labUrl);
    }

    public onReset(): void {
    }

    public searchLab(search: number): void {
      const url = this.stateUrl + '?lab=' + search;
      this.setData(url);
    }

    public searchLayerType(search: string): void {
      const url = this.stateUrl + '?layer_type=' + search;
      this.setData(url);
    }

    public searchTitle(search: string): void {
      const url = this.stateUrl + '?animal=' + search;
      this.setData(url);
    }

  private setLabs(url: string): void {
    this.dataService.getData(url).subscribe(response => {
      this.labs = response.results;
    });

  }

  private setData(url: string): void {
    this.dataService.getData(url).subscribe(response => {
      this.states = response.results;
      this.groups = Array.from(new GroupSet(response.results.map((x: GroupView) => new GroupView(x.group_name, x.layer_type))));
      this.numberOfResults = response.count;
      console.log('groups=' + this.groups.length + ' states=' + this.states.length);

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


  public toggleLeftSide(isToggled: boolean, layer_type: string): void {
    console.log(layer_type);
    this.states.filter(element => {
      return element.layer_type == layer_type;
    })
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