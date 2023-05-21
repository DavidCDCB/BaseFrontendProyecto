import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollsManagementComponent } from './payrolls-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayrollTableComponent } from './components/payroll-table/payroll-table.component';
import { PayrollFormComponent } from './components/payroll-form/payroll-form.component';



@NgModule({
  declarations: [
    PayrollsManagementComponent,
    PayrollTableComponent,
    PayrollFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PayrollsManagementModule { }
