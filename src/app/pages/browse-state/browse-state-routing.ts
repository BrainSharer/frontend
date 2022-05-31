import { RouterModule, Routes } from '@angular/router';
import { BrowseStateComponent } from './browse-state.component';
import { LoginGuard } from 'src/app/_services/login.guard';

const routes: Routes = [
  { path: '', component: BrowseStateComponent, canActivate: [LoginGuard] }
];

export const BrowseStateRoutes = RouterModule.forChild(routes);

