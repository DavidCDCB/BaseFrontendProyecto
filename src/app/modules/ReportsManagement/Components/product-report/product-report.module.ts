import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductReportComponent } from '../product-report/product-report.component';
import { ProductTableReportComponent } from './product-table-report/product-table-report.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductReportComponent, ProductTableReportComponent],
  providers: [RequestsControllerService],
  exports: [ProductReportComponent]
})
export class ProductReportModule { }
