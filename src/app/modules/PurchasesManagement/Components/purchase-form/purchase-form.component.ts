import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPurchase } from 'src/app/core/models/Purchase.interface';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
})
export class PurchaseFormComponent implements OnInit {
  @Output()
  onSubmit = new EventEmitter<IPurchase>();

  Product_Ids: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
  Supplier_Ids: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];

  purchaseForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.purchaseForm = this.formBuilder.group({
      purchasePrice: [5, [Validators.required]],
      salePrice: [10, [Validators.required]],
      quantity: [15, [Validators.required]],
      description: ['Prueba1', [Validators.required]],
      code: ['AAA01', [Validators.required]],
      datePurchase: [this.changeDateFormat('01/01/2023')],
      productId: [10,[Validators.required]],
      supplierId: [10,[Validators.required]]
    });
  }

  savePurchase(): void {
    this.purchaseForm.value.productId = parseInt(this.purchaseForm.value.productId);
    this.purchaseForm.value.supplierId = parseInt(this.purchaseForm.value.supplierId);
    this.onSubmit.emit(this.purchaseForm.value);
    this.purchaseForm.reset();
    if (this.isUpdate) {
      this.isUpdate = false;
    }
  }

  changeDateFormat(date: string): string {
    return date.split('/').reverse().join('-');
  }



  checkInput(input: string): boolean {
    const field = this.purchaseForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }


  changeFields(element: IPurchase): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.purchaseForm.patchValue(element);
      this.purchaseForm.get('datePurchase')?.setValue(this.changeDateFormat(element.datePurchase));
    }
  }

  get productId() {
    return this.purchaseForm.get('productId');
  }

  changeProductId(e: any) {
    this.productId?.setValue(e.target.value, {
      onlySelf: true,
    });
  }


  get supplierId() {
    return this.purchaseForm.get('supplierId');
  }

  changeSupplierId(e: any) {
    this.supplierId?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
