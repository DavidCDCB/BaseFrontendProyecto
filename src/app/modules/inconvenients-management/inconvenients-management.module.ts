import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InconvenientsManagementComponent } from './inconvenients-management.component';
import { InconvenientModalComponent } from './components/inconvenient-modal/inconvenient-modal.component';



@NgModule({
  declarations: [
    InconvenientsManagementComponent,
    InconvenientModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InconvenientsManagementModule { }
