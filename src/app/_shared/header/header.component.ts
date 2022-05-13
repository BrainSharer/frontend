import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from '../../_services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    user: User | undefined;
    
    constructor(public authService: AuthService) {
        /* 
        this.dataService.getCurrentUser().subscribe((resp: User) => {
            this.user = resp;
            console.log(this.user);
            if (this.user.user_id > 0) {
                this.user = resp;
            } else {
                this.user = undefined;
            }
        });
        */
    }


}
