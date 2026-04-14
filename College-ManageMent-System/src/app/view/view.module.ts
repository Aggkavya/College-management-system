import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ViewRoutingModule } from './view-routing.module';
import { DepartmentComponent } from './role/admin/department/department.component';

@NgModule({
  declarations: [
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    ReactiveFormsModule
  ]
})
export class ViewModule { }
