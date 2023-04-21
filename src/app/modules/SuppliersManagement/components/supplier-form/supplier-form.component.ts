import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import ISupplier from 'src/app/models/Supplier.interface';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<ISupplier>();

  supplierForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.supplierForm = this.formBuilder.group({
      company: ['asd', [Validators.required]],
      nit: ['213', [Validators.required]],
      name: ['sdasd', [Validators.required]],
      surName: ['asd', [Validators.required]],
      phone: ['3432', [Validators.required]],
      email: ['sddas', [Validators.required]],
      address: ['asd', [Validators.required]],
    })
  }

  saveSupplier(): void {
    this.onSubmit.emit(this.supplierForm.value);
    this.supplierForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.supplierForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: ISupplier): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.supplierForm.patchValue(element);
    }
  }
}
