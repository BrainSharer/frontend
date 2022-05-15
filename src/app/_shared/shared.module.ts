import { NgModule } from '@angular/core';

import { FilterPipe } from '../_utils/filter.pipe';

@NgModule({
  declarations: [FilterPipe],
  // exports is required so you can access your component/pipe in other modules
  exports: [FilterPipe]
})
export class SharedModule{}