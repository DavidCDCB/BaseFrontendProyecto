import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollsManagementComponent } from './payrolls-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PayrollsManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PayrollsManagementModule { }
