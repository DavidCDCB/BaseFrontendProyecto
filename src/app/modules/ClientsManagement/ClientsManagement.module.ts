import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsManagementComponent } from './ClientsManagement.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { VehicleManagementModule } from '../VehicleManagement/VehicleManagement.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VehicleManagementModule
  ],
  declarations: [ClientsManagementComponent, ClientFormComponent, ClientTableComponent],
  providers: [RequestsControllerService],
  exports: [ClientsManagementComponent]
})
export class ClientsManagementModule { }
