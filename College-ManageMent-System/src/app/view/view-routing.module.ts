import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './role/admin/department/department.component';

const routes: Routes = [
  { path: 'department', component: DepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
