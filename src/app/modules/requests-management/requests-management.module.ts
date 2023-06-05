import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsManagementComponent } from './requests-management.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { InconvenientsManagementModule } from '../inconvenients-management/inconvenients-management.module';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { MechanicTableComponent } from './components/mechanic-table/mechanic-table.component';


@NgModule({
  declarations: [
    RequestsManagementComponent,
    RequestFormComponent,
    ProductTableComponent,
    MechanicTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InconvenientsManagementModule
  ],
  providers: [RequestsControllerService],
})
export class RequestsManagementModule { }
