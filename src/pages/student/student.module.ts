import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentItemComponent } from './student-item/student-item.component';
import { ToKPipe } from './sharing/to-k.pipe';
import { ActButtonDirective } from './sharing/act-button.directive';
import { ActCardDirective } from './sharing/act-card.directive';

import { ActButtonComponent } from './act-button/act-button.component';

import { Say666Pipe } from './sharing/say-666.pipe';

import { HightLightDirective } from './sharing/highlight.directive';

import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatOptionModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';

import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,MatInputModule,
    FormsModule,MatIconModule,MatMenuModule,
    MatSelectModule,MatOptionModule,
    RouterModule.forChild([
      { path: '', component: StudentListComponent, pathMatch: 'full' },
      { path: 'detail', component: StudentDetailComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentItemComponent,
    ToKPipe,
    Say666Pipe,
    ActButtonDirective,
    ActCardDirective,
    HightLightDirective,
    ActButtonComponent
  ]
})
export class StudentModule { }
