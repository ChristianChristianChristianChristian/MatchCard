import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Level4Page } from './level4.page';

const routes: Routes = [
  {
    path: '',
    component: Level4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Level4PageRoutingModule {}
