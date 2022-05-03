import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { StateView } from '../models/state_view'
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {
  ngOnInit(): void {
    this.setData(this.apiUrl);
}
  data: StateView[] = [];
  url_ID = 0;
  baseUrl = environment.API_URL;
  ngUrl = environment.NG_URL;
  apiUrl = this.baseUrl + '/states'
  next: string = '';
  previous: string = '';
  state_data: StateView[] = [{ 
    "id": 0, 
    "group_name": '',
    "layer_name": '',
    "description": 'Place items above this one.',
    "url": '',
    "layer_type": '',
    "resolution": 0,
    "zresolution": 0,
    "lab_name": ''
    }];

  constructor(private dataService: DataService) { }

  setData(url: string) {
    this.dataService.getData(url).subscribe(response => {
      this.data = response.results;

      if (response.next) {
        this.next = response.next;
      }

      if (response.previous) {
        this.previous = response.previous;
      }

    });
  }

  // function fetches the next paginated items by using the url in the next property
  fetchNext() {
    this.setData(this.next);
  }

  // function fetches the previous paginated items by using the url in the previous property
  fetchPrevious() {
    this.setData(this.previous);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  Submit(){
    console.log(this.state_data);

    this.dataService.addStateView(this.state_data)
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
