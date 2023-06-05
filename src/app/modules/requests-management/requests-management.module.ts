import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsManagementComponent } from './requests-management.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { InconvenientsManagementModule } from '../inconvenients-management/inconvenients-management.module';
import { MechanicsManagementModule } from '../mechanics-management/mechanics-management.module';
import { ProductsManagementModule } from '../ProductsManagement/ProductsManagement.module';


@NgModule({
  declarations: [
    RequestsManagementComponent,
    RequestFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InconvenientsManagementModule,
    MechanicsManagementModule,
    ProductsManagementModule
  ],
  providers: [RequestsControllerService],
})
export class RequestsManagementModule { }
