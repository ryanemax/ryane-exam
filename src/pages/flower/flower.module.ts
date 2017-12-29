import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowerHomeComponent } from './flower-home/flower-home.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FlowerHomeComponent, pathMatch: 'full' },
    
    ])
  ],
  declarations: [FlowerHomeComponent,ButtonComponent]
})
export class FlowerModule { }
