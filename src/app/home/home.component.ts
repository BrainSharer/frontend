import { DataService } from '../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { State } from '../models/state';
import { environment } from '../../environments/environment';

const brains = ['CHATM2', 'DK1-2', 'DK19_20', 'DK30', 'DK40', 'DK5', 'DK55', 'DK62', 'DK73_truncated', 'DKEA',
  'MD589', 'MD593', 'MD599', 'MD635', 'MD652', 'MD661',
  'CHATM3', 'DK17', 'DK23', 'DK37', 'DK41', 'DK50', 'DK6', 'DK63', 'DK77',
  'JT', 'MD590', 'MD594', 'MD602', 'MD636', 'MD653', 'MD662',
  'DEMO998', 'DK17_18', 'DK28', 'DK39', 'DK43', 'DK52', 'DK60', 'DK7', 'DK8',
  'MD175', 'MD591', 'MD595', 'MD603', 'MD639', 'MD657',
  'DEMO999', 'DK18', 'DK29', 'DK39CSHL', 'DK46', 'DK54', 'DK61', 'DK73', 'DK99',
  'MD585', 'MD592', 'MD598', 'MD634', 'MD642', 'MD658', 'UCSD001'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  histology: String[] = [];
  data: State[] = [];
  baseUrl = environment.API_URL;
  ngUrl = environment.NG_URL;
  apiUrl = this.baseUrl + '/neuroglancer'
  next: string = '';
  previous: string = '';
  model: any;
  numberOfPages: number = 0;
  formatter = (result: string) => result.toUpperCase();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.setData(this.apiUrl);
  }

  private setData(url: string) {
    this.dataService.getData(url).subscribe(response => {
      this.data = response.results;
      this.numberOfPages = response.count;
      console.log(this.numberOfPages);

      if (response.next) {
        this.next = response.next;
      }

      if (response.previous) {
        this.previous = response.previous;
      }

    });
  }

  // function fetches the next paginated items by using the url in the next property
  public fetchNext() {
    console.log("is this beging called?")
    this.setData(this.next);
  }

  // function fetches the previous paginated items by using the url in the previous property
  public fetchPrevious() {
    this.setData(this.previous);
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => term === '' ? []
        : brains.filter((v: string) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )



eventCheck(event: any) {
  if (event.value) {
    alert('You selected tag ' + event.value);
  }
}

onSubmit(form: NgForm) {
  console.log('Your form data : ', form.value);
}


}
