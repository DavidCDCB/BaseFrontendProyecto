import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsManagementComponent } from './requests-management.component';
import { RequestFormComponent } from './components/request-form/request-form.component';



@NgModule({
  declarations: [
    RequestsManagementComponent,
    RequestFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RequestsManagementModule { }
