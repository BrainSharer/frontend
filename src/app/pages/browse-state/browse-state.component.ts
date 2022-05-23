import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkLoginStatus()
  }


}