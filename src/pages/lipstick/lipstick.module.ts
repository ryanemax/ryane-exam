import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LipstickListComponent } from './lipstick-list/lipstick-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ToKPipe } from './sharing/to-k.pipe';
import { ColorChangeDirective } from './sharing/color-change.directive';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LipstickListComponent, pathMatch: 'full' },
    ])
  ],
  declarations: [LipstickListComponent, ToKPipe, ColorChangeDirective]
})
export class LipstickModule { }
