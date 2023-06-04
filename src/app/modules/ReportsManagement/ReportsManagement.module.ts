import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsManagementComponent } from './ReportsManagement.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ReportsManagementComponent],
  providers: [RequestsControllerService],
  exports: [ReportsManagementComponent]
})
export class ReportsManagementModule { }
