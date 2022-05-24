import { Component } from '@angular/core';

@Component({
  selector: 'app-browse-state',
  templateUrl: './browse-state.component.html',
  styleUrls: ['./browse-state.component.css']
})
export class BrowseStateComponent {

  searchText: string = '';
  filters: Object = new Object;
  user_id: string = '';
  private sub: any;

  constructor() { }



}