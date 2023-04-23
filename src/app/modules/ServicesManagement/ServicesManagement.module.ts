import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesManagementComponent } from './ServicesManagement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceTableComponent } from './components/service-table/service-table.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ServicesManagementComponent, ServiceTableComponent, ServiceFormComponent],
  exports: [ServicesManagementComponent]
})
export class ServicesManagementModule { }
