import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IReceptionist } from 'src/app/core/models/Receptionist.interface';
import { IUser } from 'src/app/core/models/User.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-receptionist-form',
  templateUrl: './receptionist-form.component.html',
  styleUrls: ['./receptionist-form.component.scss'],
})
export class ReceptionistFormComponent implements OnInit {
  @Input()
  listOfUsers?: IUser[] = [];

  @Output()
  onSubmit = new EventEmitter<IReceptionist>();
  Users_id : any = [17, 18, 19, 21, 24, 28, 29, 33, 35, 42, 44, 45, 50, 51];

  receptionistForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;
  nameEntity: string = 'Receptionist';
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.receptionistForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      salary: [0, [Validators.required]],
      email: ['', [Validators.required]],
      userId: [, [Validators.required]],
    });
  }

  saveReceptionist(): void {
    this.onSubmit.emit(this.receptionistForm.value);
    this.receptionistForm.reset();
    this.isSubmitted = true;
    if (this.isUpdate) {
      this.isUpdate = false;
    }
    this.isSubmitted = false;
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

  get UserId() {
    return this.receptionistForm.get('userId');
  }

  changeUserId(e: any) {
    this.UserId?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
