import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginsManagementComponent } from './logins-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';



@NgModule({
  declarations: [
    LoginsManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RequestsControllerService],
})
export class LoginsManagementModule { }
