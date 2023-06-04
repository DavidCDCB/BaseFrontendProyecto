import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorsManagementComponent } from './AdministratorsManagement.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministratorFormComponent } from './Components/administrator-form/administrator-form.component';
import { AdministratorTableComponent } from './Components/administrator-table/administrator-table.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AdministratorsManagementComponent, AdministratorFormComponent, AdministratorTableComponent],
  providers: [RequestsControllerService],
  exports: [AdministratorsManagementComponent]
})
export class AdministratorsManagementModule { }
