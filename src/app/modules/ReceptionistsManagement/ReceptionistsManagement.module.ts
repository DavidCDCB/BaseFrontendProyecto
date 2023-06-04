import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionistsManagementComponent } from './ReceptionistsManagement.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceptionistFormComponent } from './Components/receptionist-form/receptionist-form.component';
import { ReceptionistTableComponent } from './Components/receptionist-table/receptionist-table.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ReceptionistsManagementComponent, ReceptionistFormComponent, ReceptionistTableComponent],
  providers: [RequestsControllerService],
  exports: [ReceptionistsManagementComponent]
})
export class ReceptionistsManagementModule { }
