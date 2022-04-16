import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { StateView } from '../models/state_view'
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {
  ngOnInit(): void {
    this.dataService.getStateViews().subscribe((resp: StateView[]) => {
      this.available_data = resp;
    });
}
  available_data: StateView[] = [];
  url_ID = 0;
  ngUrl = environment.NG_URL;
  state_data: StateView[] = [{ 
    "id": 0, 
    "prep_id": '', 
    "lab": '',
    "description": "Place items above this one.", 
    "url":"",
    }];

  constructor(private dataService: DataService) { }

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
