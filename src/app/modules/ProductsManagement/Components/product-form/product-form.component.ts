import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IProduct } from 'src/app/core/models/Product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<IProduct>();

  productForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['Producto10', [Validators.required]],
      code: ['COD10A', [Validators.required]],
      brand: ['Generic', [Validators.required]],
      description: ['Producto inicial para clientes', [Validators.required]],
    })
  }

  saveProduct(): void {
    this.onSubmit.emit(this.productForm.value);
    this.productForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.productForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IProduct): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.productForm.patchValue(element);
    }
  }

}