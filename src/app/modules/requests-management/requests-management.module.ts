import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsManagementComponent } from './requests-management.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';



@NgModule({
  declarations: [
    RequestsManagementComponent,
    RequestFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RequestsControllerService],
})
export class RequestsManagementModule { }
