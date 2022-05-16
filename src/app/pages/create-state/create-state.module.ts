import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CreateStateComponent } from './create-state.component';
import { DataService } from '../../_services/data.service';
import { CreateStateRoutes } from './create-state-routing.module';


@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule, NgbModule, CreateStateRoutes ],
  declarations: [ CreateStateComponent ],
  providers: [ DataService ],
  bootstrap: [CreateStateComponent]
})
export class CreateStateModule { }
