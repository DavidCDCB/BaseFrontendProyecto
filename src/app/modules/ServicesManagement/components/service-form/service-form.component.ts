import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IServiceRequest } from 'src/app/core/models/ServiceRequest.interface';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<IServiceRequest>();

  serviceForm!: FormGroup;
  isUpdate: boolean = false;
  isView: boolean = false;
  idRequestForUpdate: number = 0;
  idServiceForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.serviceForm = this.formBuilder.group({
      starDate: [formatDate(this.changeDateFormat('22/03/2023'), 'yyyy-MM-dd', 'en'), [Validators.required]],
      endDate: [formatDate(this.changeDateFormat('22/04/2023'), 'yyyy-MM-dd', 'en'), [Validators.required]],
      name: ['asd', [Validators.required]],
      state: ['Finalizado', [Validators.required]],
      price: [213213, [Validators.required]],
      description: ['asd', [Validators.required]],
      category: ['asd', [Validators.required]],
    })
  }

  changeDateFormat(date: string): string {
    return date.split('/').reverse().join('-');
  }

  saveServiceRequest(): void {
    this.onSubmit.emit(this.serviceForm.value);
    this.serviceForm.reset();
  }

  checkInput(input: string): boolean {
    const field = this.serviceForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IServiceRequest): void {
    if (element) {
      this.serviceForm.patchValue(element);
      this.serviceForm.get('starDate')?.setValue(formatDate(this.changeDateFormat(element.starDate), 'yyyy-MM-dd', 'en'));
      this.serviceForm.get('endDate')?.setValue(formatDate(this.changeDateFormat(element.endDate), 'yyyy-MM-dd', 'en'));
    }
  }

  clearFields(): void {
    this.isView = false;
    this.serviceForm.reset();
  }
}
