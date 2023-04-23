import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import IClient from 'src/app/core/models/Client.interface';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<IClient>();

  clientForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.clientForm = this.formBuilder.group({
      name: ['asd', [Validators.required]],
      surname: ['213', [Validators.required]],
      phone: ['asd', [Validators.required]],
      email: ['3432', [Validators.required]],
      type: ['sddas', [Validators.required]],
      address: ['asd', [Validators.required]],
    })
  }

  saveClient(): void {
    this.onSubmit.emit(this.clientForm.value);
    this.clientForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.clientForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IClient): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.clientForm.patchValue(element);
    }
  }

}
