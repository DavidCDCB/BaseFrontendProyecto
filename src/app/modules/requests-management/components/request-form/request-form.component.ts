import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  requestForm!: FormGroup;
  isUpdate: boolean = false;
  isView: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.requestForm = this.formBuilder.group({
      starDate: [this.changeDateFormat('22/03/2023'), [Validators.required]],
      endDate: [this.changeDateFormat('22/03/2023'), [Validators.required]],
      state: ['Finalizado', [Validators.required]],
    })
  }
  saveRequest(){

  }
  checkInput(input: string): boolean {
    const field = this.requestForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }
  changeDateFormat(date: string): string {
    return date.split('/').reverse().join('-');
  }

}
