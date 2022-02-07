import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { Observable, map } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

export interface State {
    id: number,
    owner_id: number,
    neuroglancer_state: Record<string, unknown>,
    user_date: string,
    comments: string
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    data: any[] | undefined;
    histology: String[] = [];
    formGroup: FormGroup;
    results: State[] = [];
    stateurl = 'https://brainsharer.org/brainsharer/neuroglancer';

    constructor(public dataService: DataService, // private http: HttpClient,
        private formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({
            title: formBuilder.control('initial value')
        });
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            histology: [],
        });

        this.dataService.getStates().subscribe((data: any) => {
            this.data = data['results'];
        });
    }
    
    /*
    onGetStates(id: number): Observable<State[]> {
        return this.http
            .get<State[]>(this.stateurl)
            .map((results: State[]) => {
                const tempspots: State[] =[];
                results.forEach(state => {
                    if (state.id > id) {
                        tempspots.push(state);
                    }
                })
                return tempspots;
            })
    }
    */

    eventCheck(event: any) {
        if (event.value) {
            alert('You selected tag ' + event.value);
            
        }
    }

}
