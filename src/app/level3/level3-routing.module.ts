import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Level3Page } from './level3.page';

const routes: Routes = [
  {
    path: '',
    component: Level3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Level3PageRoutingModule {}
