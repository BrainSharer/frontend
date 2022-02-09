import { DataService } from '../data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


const brains = ['CHATM2', 'DK1-2',  'DK19_20','DK30', 'DK40', 'DK5', 'DK55', 'DK62', 'DK73_truncated', 'DKEA', 
 'MD589', 'MD593', 'MD599', 'MD635', 'MD652', 'MD661',
'CHATM3',  'DK17',    'DK23',    'DK37',     'DK41', 'DK50', 'DK6',  'DK63', 'DK77',  
'JT',  'MD590', 'MD594', 'MD602', 'MD636', 'MD653', 'MD662',
'DEMO998', 'DK17_18', 'DK28','DK39', 'DK43', 'DK52', 'DK60','DK7', 'DK8', 
'MD175', 'MD591', 'MD595', 'MD603', 'MD639', 'MD657',
'DEMO999','DK18', 'DK29', 'DK39CSHL', 'DK46', 'DK54', 'DK61', 'DK73', 'DK99', 
'MD585', 'MD592', 'MD598', 'MD634', 'MD642', 'MD658', 'UCSD001'
];

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

    model: any;
    formatter = (result: string) => result.toUpperCase();

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
            console.log(this.data);
        });
    }

    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term: string) => term === '' ? []
                : brains.filter((v: string) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )


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
