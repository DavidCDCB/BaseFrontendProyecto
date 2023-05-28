import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/core/models/User.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output()
  onSubmit = new EventEmitter<IUser>();

  Rols: any = ['Receptionist', 'Mechanic'];

  userForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['test1@gmail.com', [Validators.required]],
      password: ['Admin12345', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  saveUser(): void {
    this.onSave();
    this.onSubmit.emit(this.userForm.value);
    this.userForm.reset();
    if (this.isUpdate) {
      this.isUpdate = false;
    }
  }

  changeRole(e: any) {
    this.roleName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  checkInput(input: string): boolean {
    const field = this.userForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  get roleName() {
    return this.userForm.get('role');
  }

  onSave(): void {
    console.log(this.userForm);
    this.isSubmitted = true;
    if (!this.userForm.valid) {
      false;
    } else {
      console.log(this.userForm.value.role);
      this.userForm.value.role;
    }
  }

  changeFields(element: IUser): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.userForm.patchValue(element);
    }
  }
}
