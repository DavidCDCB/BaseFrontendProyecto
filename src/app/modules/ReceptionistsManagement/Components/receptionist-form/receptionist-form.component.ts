import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IReceptionist } from 'src/app/core/models/Receptionist.interface';

@Component({
  selector: 'app-receptionist-form',
  templateUrl: './receptionist-form.component.html',
  styleUrls: ['./receptionist-form.component.scss'],
})
export class ReceptionistFormComponent implements OnInit {
  @Output()
  onSubmit = new EventEmitter<IReceptionist>();

  receptionistForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.receptionistForm = this.formBuilder.group({
      name: ['RecName1', [Validators.required]],
      surname: ['RecSurname1', [Validators.required]],
      phone: ['123456789', [Validators.required]],
      address: ['RecAddress1', [Validators.required]],
      salary: [500000, [Validators.required]],
      email: ['rec1@gmail.com', [Validators.required]],
      userId: [1],
    });
  }

  saveReceptionist(): void {
    this.onSubmit.emit(this.receptionistForm.value);
    this.receptionistForm.reset();
    if (this.isUpdate) {
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.receptionistForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IReceptionist): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.receptionistForm.patchValue(element);
    }
  }
}
