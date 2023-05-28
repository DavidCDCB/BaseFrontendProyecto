import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IVehicle } from 'src/app/core/models/Vehicle.interface';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter<IVehicle>();

  vehicleForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.vehicleForm = this.formBuilder.group({
      model: ['sd', [Validators.required]],
      year: ['2023', [Validators.required]],
      color: ['sds', [Validators.required]],
      plate: ['sdasd', [Validators.required]],
      description: ['asds', [Validators.required]],
    })
  }

  saveVehicle(): void {
    this.onSubmit.emit(this.vehicleForm.value);
    this.vehicleForm.reset();
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  checkInput(input: string): boolean {
    const field = this.vehicleForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: IVehicle): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.vehicleForm.patchValue(element);
    }
  }

}
