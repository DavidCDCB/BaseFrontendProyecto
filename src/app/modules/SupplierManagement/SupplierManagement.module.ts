import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierManagementComponent } from './SupplierManagement.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SupplierManagementComponent],
  exports: [SupplierManagementComponent]
})
export class SupplierManagementModule { }
