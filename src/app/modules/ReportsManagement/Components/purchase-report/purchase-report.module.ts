import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseReportComponent } from '../purchase-report/purchase-report.component';
import { PurchaseTableReportComponent } from './purchase-table-report/purchase-table-report.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PurchaseReportComponent, PurchaseTableReportComponent],
  providers: [RequestsControllerService],
  exports: [PurchaseReportComponent]
})
export class PurchaseReportModule { }
