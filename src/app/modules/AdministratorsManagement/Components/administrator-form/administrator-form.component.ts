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

  administratorForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.administratorForm = this.formBuilder.group({
      name: ['NameAdmin1', [Validators.required]],
      surname: ['SurnameAdmin1', [Validators.required]],
      phone: ['31258966545', [Validators.required]],
      userId: [1, [Validators.required]],
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

}
