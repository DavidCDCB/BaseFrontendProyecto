import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesManagementComponent } from './ServicesManagement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDirectiveDirective } from './my-directive.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [	ServicesManagementComponent,
      MyDirectiveDirective
  ],
  exports: [ServicesManagementComponent]
})
export class ServicesManagementModule { }
