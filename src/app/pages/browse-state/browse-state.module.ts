import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowseStateComponent } from './browse-state.component';
import { SearchComponent } from './search.component';
import { BrowseStateListComponent } from './browse-state-list.component';
import { DataService } from '../../_services/data.service';
import { FilterPipe } from '../../_utils/filter.pipe';
import { BrowseStateRoutes } from './browse-state-routing.module';


@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule, BrowseStateRoutes ],
  declarations: [ BrowseStateComponent, SearchComponent, BrowseStateListComponent, FilterPipe ],
  providers: [ DataService ]
})
export class BrowseStateModule { }
