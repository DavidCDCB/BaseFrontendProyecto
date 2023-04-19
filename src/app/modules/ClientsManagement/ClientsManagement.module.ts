import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsManagementComponent } from './ClientsManagement.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClientsManagementComponent],
  providers: [RequestsControllerService],
  exports: [ClientsManagementComponent]
})
export class ClientsManagementModule { }
