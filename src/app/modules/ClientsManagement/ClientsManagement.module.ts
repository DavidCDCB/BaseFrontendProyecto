import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsManagementComponent } from './ClientsManagement.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClientsManagementComponent],
  exports: [ClientsManagementComponent]
})
export class ClientsManagementModule { }
