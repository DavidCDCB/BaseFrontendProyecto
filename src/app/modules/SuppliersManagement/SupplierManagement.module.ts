import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierManagementComponent } from './SupplierManagement.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { SupplierTableComponent } from './components/supplier-table/supplier-table.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SupplierManagementComponent, 
    SupplierFormComponent, 
    SupplierTableComponent
  ],
  providers: [RequestsControllerService],
  exports: [SupplierManagementComponent]
})
export class SupplierManagementModule { }
