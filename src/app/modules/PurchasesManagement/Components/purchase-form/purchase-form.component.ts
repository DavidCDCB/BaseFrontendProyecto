import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IPurchase } from 'src/app/core/models/Purchase.interface';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
})
export class PurchaseFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<IPurchase>();

  purchaseForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.purchaseForm = this.formBuilder.group({
      purchasePrice: [100, [Validators.required]],
      salePrice: [150, [Validators.required]],
      quantity: [15, [Validators.required]],
      description: ['Descripcion para compra 1', [Validators.required]],
      code: ['CodigoProd1', [Validators.required]],
      datePurchase: [this.changeDateFormat('22/03/2023'), [Validators.required]],
      productId: [1, [Validators.required]],
      supplierId: [1, [Validators.required]]
    })
  }

  changeDateFormat(date: string): string {
    return date.split('/').reverse().join('-');
  }

  savePurchase(): void {
    this.onSubmit.emit(this.purchaseForm.value);
    this.purchaseForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.purchaseForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }



  changeFields(element: IPurchase): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      if (element) {
        this.purchaseForm.patchValue(element);
        this.purchaseForm.get('datePurchase')?.setValue(this.changeDateFormat(element.datePurchase));
      }
    }
  }

}
