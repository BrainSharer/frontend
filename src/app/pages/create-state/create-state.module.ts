import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CreateStateComponent } from './create-state.component';
import { DataService } from 'src/app/_services/data.service';
import { CreateStateRoutes } from './create-state-routing.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { InterceptService } from 'src/app/_services/intercept.service';
import { AuthGuard } from 'src/app/_services/auth.guard';

@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule, NgbModule, CreateStateRoutes, 
    MatExpansionModule, MatIconModule, SharedModule],
  declarations: [ CreateStateComponent ],
  providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
    AuthGuard,  DataService ],
  bootstrap: [CreateStateComponent]
})
export class CreateStateModule { }
