import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecepcionistsManagementComponent } from './RecepcionistsManagement.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecepcionistFormComponent } from './Components/recepcionist-form/recepcionist-form.component';
import { RecepcionistTableComponent } from './Components/recepcionist-table/recepcionist-table.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [RecepcionistsManagementComponent, RecepcionistFormComponent, RecepcionistTableComponent],
  providers: [RequestsControllerService],
  exports: [RecepcionistsManagementComponent]
})
export class RecepcionistsManagementModule { }
