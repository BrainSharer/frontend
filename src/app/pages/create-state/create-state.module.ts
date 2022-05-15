import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CreateStateComponent } from './create-state.component';
import { SearchComponent } from './search.component';
import { CreateStateListComponent } from './create-state-list.component';
import { DataService } from '../../_services/data.service';
import { CreateStateRoutes } from './create-state-routing.module';
import { SharedModule } from '../../_shared/shared.module';


@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule, NgbModule, CreateStateRoutes, SharedModule ],
  declarations: [ CreateStateComponent, SearchComponent, CreateStateListComponent ],
  providers: [ DataService ],
  bootstrap: [CreateStateComponent]
})
export class CreateStateModule { }
