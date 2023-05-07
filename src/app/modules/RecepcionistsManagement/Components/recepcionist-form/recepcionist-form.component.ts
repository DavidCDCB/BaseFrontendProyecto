import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IRecepcionist } from 'src/app/core/models/Recepcionist.interface';

@Component({
  selector: 'app-recepcionist-form',
  templateUrl: './recepcionist-form.component.html',
  styleUrls: ['./recepcionist-form.component.scss'],
})
export class RecepcionistFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<IRecepcionist>();

  recepcionistForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.recepcionistForm = this.formBuilder.group({
      name: ['RecName1', [Validators.required]],
      surname: ['RecSurname1', [Validators.required]],
      phone: ['123456789', [Validators.required]],
      address: ['RecAddress1', [Validators.required]],
      salary: [500000, [Validators.required]],
      email: ['rec1@gmail.com', [Validators.required]],
      userId: [1, [Validators.required]],
    })
  }

  saveRecepcionist(): void {
    this.onSubmit.emit(this.recepcionistForm.value);
    this.recepcionistForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.recepcionistForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IRecepcionist): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.recepcionistForm.patchValue(element);
    }
  }

}
