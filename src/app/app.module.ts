import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_shared/header/header.component';
import { CreateStateComponent } from './pages/create-state/create-state.component';
import { ContactComponent } from './pages/contact/contact.component';
import { InterceptService } from './_services/intercept.service';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_services/auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CreateStateComponent,
        ContactComponent,
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
