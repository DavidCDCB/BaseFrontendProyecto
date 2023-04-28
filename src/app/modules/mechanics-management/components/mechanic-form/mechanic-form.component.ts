import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IMechanic } from 'src/app/core/models/Mechanic.interface';

@Component({
  selector: 'app-mechanic-form',
  templateUrl: './mechanic-form.component.html',
  styleUrls: ['./mechanic-form.component.scss']
})
export class MechanicFormComponent implements OnInit{

  @Output()
  onSubmit = new EventEmitter<IMechanic>();

  mechanicForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.mechanicForm = this.formBuilder.group({
      name: ['asdf', [Validators.required]],
      surname: ['213', [Validators.required]],
      phone: ['asd', [Validators.required]],
      email: ['3432', [Validators.required]],
      role: ['sddas', [Validators.required]],
      address: ['asd', [Validators.required]],
    })
  }

  saveMechanic(): void {
    this.onSubmit.emit(this.mechanicForm.value);
    this.mechanicForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.mechanicForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IMechanic): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.mechanicForm.patchValue(element);
    }
  }

}
