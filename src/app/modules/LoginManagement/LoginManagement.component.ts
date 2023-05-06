import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ILogin } from 'src/app/core/models/Login.interface';

@Component({
  selector: 'app-LoginManagement',
  templateUrl: './LoginManagement.component.html',
  styleUrls: ['./LoginManagement.component.scss'],
})
export class LoginFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<ILogin>();

  loginForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['test1@gmail.com', [Validators.required]],
      password: ['Admin12345', [Validators.required]],
    })
  }

  saveLogin(): void {
    this.onSubmit.emit(this.loginForm.value);
    this.loginForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.loginForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: ILogin): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.loginForm.patchValue(element);
    }
  }

}
