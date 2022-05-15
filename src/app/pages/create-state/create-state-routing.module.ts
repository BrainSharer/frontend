import { RouterModule, Routes } from '@angular/router';
import { CreateStateComponent } from './create-state.component';

const routes: Routes = [
  { path: '', component: CreateStateComponent }
];

export const CreateStateRoutes = RouterModule.forChild(routes);

