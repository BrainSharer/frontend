import { Component, OnInit } from '@angular/core';
import { DataService }  from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    data: any[] | undefined;

  constructor(public dataService : DataService) { }

 ngOnInit(): void {
    this.dataService.getStates().subscribe((data: any)=>{
      this.data = data['results'];
    });
  }
  
}
