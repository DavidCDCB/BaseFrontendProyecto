import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsManagementComponent } from './requests-management.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ServiceTableComponent } from './components/service-table/service-table.component';
import { MechanicTableComponent } from './components/mechanic-table/mechanic-table.component';



@NgModule({
  declarations: [
    RequestsManagementComponent,
    RequestFormComponent,
    ProductTableComponent,
    ServiceTableComponent,
    MechanicTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RequestsControllerService],
})
export class RequestsManagementModule { }
