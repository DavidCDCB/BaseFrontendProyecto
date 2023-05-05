import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IInconvenient } from 'src/app/core/models/Inconvenient.interface';

@Component({
  selector: 'app-inconvenient-form',
  templateUrl: './inconvenient-form.component.html',
  styleUrls: ['./inconvenient-form.component.scss']
})
export class InconvenientFormComponent implements OnInit{
  @Output()
  onSubmit = new EventEmitter<IInconvenient>();

  inconvenientForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.inconvenientForm = this.formBuilder.group({
      dateAct: [this.changeDateFormat('22/03/2023'), [Validators.required]],
      state: ['sdasd', [Validators.required]],
      daysDelay: [3, [Validators.required]],
      serviceRequestId: [10, [Validators.required]],
      seen: [10, [Validators.required]],
      description: ['sdasd', [Validators.required]],
    })
  }
  changeDateFormat(date: string): string {
    return date.split('/').reverse().join('-');
  }
  saveInconvenient(): void {
    this.onSubmit.emit(this.inconvenientForm.value);
    this.inconvenientForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.inconvenientForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IInconvenient): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.inconvenientForm.patchValue(element);
    }
  }

}
