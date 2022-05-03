import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    user: User | undefined;
    
    constructor(private readonly dataService: DataService,) { 
        this.dataService.getCurrentUser().subscribe((resp: User) => {
            this.user = resp;
            if (this.user.user_id > 0) {
                this.user = resp;
            } else {
                this.user = undefined;
            }
        });
    }


}
