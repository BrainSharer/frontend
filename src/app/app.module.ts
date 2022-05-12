import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header.component';
import { CreateStateComponent } from './components/create-state.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContactComponent } from './components/contact/contact.component';
import { ToastrModule } from 'ngx-toastr';


import { InterceptService } from './services/intercept.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { FilterPipe } from './utils/filter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        CreateStateComponent,
        ContactComponent,
        FilterPipe,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DragDropModule,
        ToastrModule.forRoot()
    ],
    providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
        AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
