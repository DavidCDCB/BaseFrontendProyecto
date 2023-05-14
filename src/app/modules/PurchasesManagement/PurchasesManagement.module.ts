import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesManagementComponent } from './PurchasesManagement.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseFormComponent } from './Components/purchase-form/purchase-form.component';
import { PurchaseTableComponent } from './Components/purchase-table/purchase-table.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PurchasesManagementComponent, PurchaseFormComponent, PurchaseTableComponent],
  providers: [RequestsControllerService],
  exports: [PurchasesManagementComponent]
})
export class PurchasesManagementModule { }
