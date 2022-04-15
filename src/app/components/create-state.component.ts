import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { StateView } from '../models/state_view'
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {
  ngOnInit(): void {
    this.dataService.getViews().subscribe((resp: StateView[]) => {
      this.available_data = resp;
    });
}
  available_data: StateView[] = [];
  state_data: StateView[] = [{ 
    "id": 0, 
    "prep_id": '', 
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
  }
}
