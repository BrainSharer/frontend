import { RouterModule, Routes } from '@angular/router';
import { BrowseStateComponent } from './browse-state.component';
import { AuthGuard } from 'src/app/_services/auth.guard';
import { LoginGuard } from 'src/app/_services/login.guard';

const routes: Routes = [
  { path: '', component: BrowseStateComponent, canActivate: [LoginGuard, AuthGuard] }
];

export const BrowseStateRoutes = RouterModule.forChild(routes);

