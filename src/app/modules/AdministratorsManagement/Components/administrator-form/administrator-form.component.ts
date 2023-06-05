import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IAdministrator } from 'src/app/core/models/Administrator.interface';

@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.component.html',
  styleUrls: ['./administrator-form.component.scss'],
})
export class AdministratorFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<IAdministrator>();

  Users_id : any = [2, 4, 5, 7, 8, 10, 12, 13, 14, 15, 16, 20, 22, 23, 27, 31, 33, 37, 38, 39, 41, 43, 46, 48, 49, 52];

  administratorForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.administratorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      userId: [46, [Validators.required]]
    })
  }

  saveAdministrator(): void {
    this.onSubmit.emit(this.administratorForm.value);
    this.administratorForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.administratorForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IAdministrator): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.administratorForm.patchValue(element);
    }
  }

  get UserId() {
    return this.administratorForm.get('userId');
  }

  changeUserId(e: any) {
    this.UserId?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

}
