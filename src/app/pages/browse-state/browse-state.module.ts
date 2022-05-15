import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowseStateComponent } from './browse-state.component';
import { SearchComponent } from './search.component';
import { BrowseStateListComponent } from './browse-state-list.component';
import { DataService } from '../../_services/data.service';
import { BrowseStateRoutes } from './browse-state-routing.module';
import { SharedModule } from '../../_shared/shared.module';


@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule, BrowseStateRoutes, SharedModule ],
  declarations: [ BrowseStateComponent, SearchComponent, BrowseStateListComponent ],
  providers: [ DataService ]
})
export class BrowseStateModule { }
