import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginGuard } from 'src/app/_services/login.guard';

const accountModule = () => import('./pages/account/account.module').then(x => x.AccountModule);
const browseStateModule = () => import('./pages/browse-state/browse-state.module').then(x => x.BrowseStateModule);
const createStateModule = () => import('./pages/create-state/create-state.module').then(x => x.CreateStateModule);



const routes: Routes = [
    { path: '', loadChildren: browseStateModule, canActivate: [LoginGuard] },
    { path: 'account', loadChildren: accountModule, canActivate: [LoginGuard]  },
    { path: 'browse-state', loadChildren: browseStateModule, canActivate: [LoginGuard]  },
    { path: 'create-view', loadChildren: createStateModule },
    { path: 'contact', component: ContactComponent, canActivate: [LoginGuard]  },
    // otherwise redirect to home
    { path: '**', redirectTo: '', canActivate: [LoginGuard]  }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
