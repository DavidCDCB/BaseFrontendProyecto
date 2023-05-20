import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceReportComponent } from '../service-report/service-report.component';
import { ServiceTableReportComponent } from './service-table-report/service-table-report.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ServiceReportComponent, ServiceTableReportComponent],
  providers: [RequestsControllerService],
  exports: [ServiceReportComponent]
})
export class ServiceReportModule { }
