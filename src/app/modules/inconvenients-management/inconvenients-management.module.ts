import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InconvenientsManagementComponent } from './inconvenients-management.component';
import { InconvenientModalComponent } from './components/inconvenient-modal/inconvenient-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InconvenientFormComponent } from './components/inconvenient-form/inconvenient-form.component';
import { InconvenientTableComponent } from './components/inconvenient-table/inconvenient-table.component';



@NgModule({
  declarations: [
    InconvenientsManagementComponent,
    InconvenientModalComponent,
    InconvenientFormComponent,
    InconvenientTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [InconvenientsManagementComponent]
})
export class InconvenientsManagementModule { }
