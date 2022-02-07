import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
