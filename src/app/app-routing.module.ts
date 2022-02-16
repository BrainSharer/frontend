import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateStateComponent } from './components/create-state.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'account', loadChildren: accountModule },
    { path: 'create-view', component: CreateStateComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
