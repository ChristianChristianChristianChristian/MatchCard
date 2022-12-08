import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Level4PageRoutingModule } from './level4-routing.module';

import { Level4Page } from './level4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Level4PageRoutingModule
  ],
  declarations: [Level4Page]
})
export class Level4PageModule {}
