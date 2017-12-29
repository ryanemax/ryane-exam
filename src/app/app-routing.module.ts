import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule',
    // data: { title: "主页" }
  },
  {
    path: 'bigdata',
    loadChildren: './bigdata/bigdata.module#BigdataModule',
  },
  {
    path: 'book',
    loadChildren: '../pages/book/book.module#BookModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
