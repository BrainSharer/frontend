import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStateComponent } from './pages/create-state/create-state.component';
import { ContactComponent } from './pages/contact/contact.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const browseStateModule = () => import('./pages/browse-state/browse-state.module').then(x => x.BrowseStateModule);



const routes: Routes = [
    { path: '', loadChildren: browseStateModule },
    { path: 'account', loadChildren: accountModule },
    { path: 'browse-state', loadChildren: browseStateModule },
    { path: 'create-view', component: CreateStateComponent },
    { path: 'contact', component: ContactComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
