import { RouterModule, Routes } from '@angular/router';
import { CreateStateComponent } from './create-state.component';
import { AuthGuard } from 'src/app/_services/auth.guard';
import { LoginGuard } from 'src/app/_services/login.guard';

const routes: Routes = [
  { path: '', component: CreateStateComponent, canActivate: [LoginGuard, AuthGuard] }
];

export const CreateStateRoutes = RouterModule.forChild(routes);

