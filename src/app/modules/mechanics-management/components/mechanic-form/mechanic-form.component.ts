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
      name: ['Carlos', [Validators.required]],
      surname: ['Luna', [Validators.required]],
      phone: ['321458', [Validators.required]],
      email: ['mecanico@gmail.com', [Validators.required]],
      role: ['Master', [Validators.required]],
      address: ['Cra 30b #65', [Validators.required]],
      commission: [1234, [Validators.required]],
      salary: [1234, [Validators.required]]
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
