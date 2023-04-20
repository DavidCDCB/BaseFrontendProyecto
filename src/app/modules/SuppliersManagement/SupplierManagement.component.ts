import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-SupplierManagement',
  templateUrl: './SupplierManagement.component.html',
  styleUrls: ['./SupplierManagement.component.scss']
})
export class SupplierManagementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect(): void {
    this.router.navigate(
      [`services/${'dato'}`], 
      { state: { data: 'Dato compuesto' }, 
      queryParams: { otroDato: '1' } }
    );
  }

}
