import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IPayroll } from 'src/app/core/models/Payroll.interface';

@Component({
  selector: 'app-payroll-form',
  templateUrl: './payroll-form.component.html',
  styleUrls: ['./payroll-form.component.scss']
})
export class PayrollFormComponent {

  @Output()
  onSubmit = new EventEmitter<IPayroll>();

  payrollForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.payrollForm = this.formBuilder.group({
      starDate: [this.changeDateFormat('22/03/2023'), [Validators.required]],
      endDate: [this.changeDateFormat('22/03/2023'), [Validators.required]],
      description: ['asdfa asdf', [Validators.required]],
      accruals: [1234, [Validators.required]],
      deductions: [1234, [Validators.required]],
      settlement: [1234, [Validators.required]]
    })
  }
  changeDateFormat(date: string): string {
    return date.split('/').reverse().join('-');
  }

  savePayroll(): void {
    this.onSubmit.emit(this.payrollForm.value);
    this.payrollForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.payrollForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IPayroll): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.payrollForm.patchValue(element);
    }
  }

}
