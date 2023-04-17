import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesManagementComponent } from './ServicesManagement.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ServicesManagementComponent],
  exports: [ServicesManagementComponent]
})
export class ServicesManagementModule { }
