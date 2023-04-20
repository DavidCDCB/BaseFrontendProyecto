import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ServicesManagement',
  templateUrl: './ServicesManagement.component.html',
  styleUrls: ['./ServicesManagement.component.scss']
})
export class ServicesManagementComponent implements OnInit {
  id?: string;
  data?: any;
  extraData: any;
  registerForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  formInit(): FormGroup {
    return this.formBuilder.group({
      origen: ['', [Validators.required, Validators.pattern("[A-Z]{3}")]],
      destino: ['', [Validators.required, Validators.pattern("[A-Z]{3}")]],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.data = history.state.data;
    this.route.queryParams.subscribe((params: any) => {
      this.extraData = params['otroDato'];
    })
    
    this.registerForm = this.formInit();
    this.registerForm.setValue({
      origen: this.id,
      destino: this.id
    })
    this.registerForm.valueChanges.subscribe(
      (data: any) => {
        console.log(data);
      }
    )
  }

}
