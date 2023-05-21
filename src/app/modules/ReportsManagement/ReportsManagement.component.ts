import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ReportsManagement',
  templateUrl: './ReportsManagement.component.html',
  styleUrls: ['./ReportsManagement.component.scss']
})
export class ReportsManagementComponent implements OnInit {

  ngOnInit() {
  }

  isSubmitted = false;
  Report: any = ['Reporte de Compras', 'Reporte de Vehiculos', 'Reporte de Servicios', 'Reporte de Productos'];
  constructor(public fb: FormBuilder,private router: Router) {}
  registrationForm = this.fb.group({
    reportName: ['', [Validators.required]],
  });
  changeReport(e: any) {
    this.reportName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access formcontrols getter
  get reportName() {
    return this.registrationForm.get('reportName');
  }
  onSubmit(): void {
    console.log(this.registrationForm);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    } else {
      switch (this.registrationForm.value.reportName) {
        case 'Reporte de Compras':
          this.router.navigate(['/reports/purchase-report']);
          break;
        case 'Reporte de Vehiculos':
          this.router.navigate(['/reports/vehicle-report']);
          break;
        case 'Reporte de Servicios':
          this.router.navigate(['/reports/service-report']);
          break;
        case 'Reporte de Productos':
          this.router.navigate(['/reports/product-report']);
          break;
        default:
          break;
      }
    }
  }
}
