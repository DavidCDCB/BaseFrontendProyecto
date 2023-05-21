import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './UsersManagement.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { UserTableComponent } from './Components/user-table/user-table.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [UsersManagementComponent, UserFormComponent, UserTableComponent],
  providers: [RequestsControllerService],
  exports: [UsersManagementComponent]
})
export class UsersManagementModule { }
