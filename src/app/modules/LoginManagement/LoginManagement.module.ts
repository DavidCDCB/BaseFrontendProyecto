import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginManagementModule],
  providers: [RequestsControllerService],
  exports: [LoginManagementModule]
})
export class LoginManagementModule { }
