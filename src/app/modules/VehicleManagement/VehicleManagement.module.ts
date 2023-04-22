import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleManagementComponent } from './VehicleManagement.component';
import { VehicleModalComponent } from './components/vehicle-modal/vehicle-modal.component';
import { VehicleTableComponent } from './components/vehicle-table/vehicle-table.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    VehicleManagementComponent, 
    VehicleModalComponent, 
    VehicleTableComponent, 
    VehicleFormComponent
  ],
  exports: [VehicleManagementComponent]
})
export class VehicleManagementModule { }
