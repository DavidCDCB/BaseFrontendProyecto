import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MechanicsManagementComponent } from './mechanics-management.component';
import { MechanicFormComponent } from './components/mechanic-form/mechanic-form.component';
import { MechanicTableComponent } from './components/mechanic-table/mechanic-table.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MechanicsManagementComponent,
    MechanicFormComponent,
    MechanicTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RequestsControllerService],
})
export class MechanicsManagementModule { }
