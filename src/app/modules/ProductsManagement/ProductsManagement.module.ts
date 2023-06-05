import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsManagementComponent } from './ProductsManagement.component';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './Components/product-form/product-form.component';
import { ProductTableComponent } from './Components/product-table/product-table.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductsManagementComponent, ProductFormComponent, ProductTableComponent],
  providers: [RequestsControllerService],
  exports: [ProductsManagementComponent, ProductTableComponent]
})
export class ProductsManagementModule { }
