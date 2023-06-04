import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleReportComponent } from '../vehicle-report/vehicle-report.component';
import { VehicleTableReportComponent } from './vehicle-table-report/vehicle-table-report.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [VehicleReportComponent, VehicleTableReportComponent],
  providers: [RequestsControllerService],
  exports: [VehicleReportComponent]
})
export class VehicleReportModule { }
