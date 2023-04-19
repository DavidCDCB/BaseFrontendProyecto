import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesManagementComponent } from './ServicesManagement.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [ServicesManagementComponent],
  exports: [ServicesManagementComponent]
})
export class ServicesManagementModule { }
