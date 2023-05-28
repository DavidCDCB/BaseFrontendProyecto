import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IUser } from 'src/app/core/models/User.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<IUser>();

  userForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['test1@gmail.com', [Validators.required]],
      password: ['Admin12345', [Validators.required]],
      role: ['Administrator', [Validators.required]],
    })
  }

  saveUser(): void {
    this.onSubmit.emit(this.userForm.value);
    this.userForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.userForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IUser): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.userForm.patchValue(element);
    }
  }

}
