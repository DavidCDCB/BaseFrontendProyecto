import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/models/Supplier.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  suppliers?: ISupplier[];
  supplierForm!: FormGroup;
  isSubmit: boolean = false;

  constructor(
    private HTTPClient: RequestsControllerService<ISupplier>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //this.getSuppliers();
    this.initForm();
  }

  initForm(): void {
    this.supplierForm = this.formBuilder.group({
      company: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
  }

  getSuppliers(): ISupplier[] {
    this.HTTPClient.getElement("Supplier").subscribe(
      (suppliers: ISupplier[]) => {
        this.suppliers = suppliers;
      }
    )
    return this.suppliers!;
  }

  checkInput(input: string): boolean {
    const field = this.supplierForm.get(input);
    
    return field!.pristine === false && field!.errors != null;
  }
}
