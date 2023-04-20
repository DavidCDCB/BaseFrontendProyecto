import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ISupplier } from 'src/app/models/Supplier.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';


@Component({
  selector: 'app-SupplierManagement',
  templateUrl: './SupplierManagement.component.html',
  styleUrls: ['./SupplierManagement.component.scss']
})
export class SupplierManagementComponent implements OnInit {

  @ViewChild('childForm') childFormComponent!: SupplierFormComponent;

  suppliers?: ISupplier[] = [];
  constructor(private router: Router, private HTTPClient: RequestsControllerService<ISupplier>) { }

  ngOnInit() {
    this.getSuppliers();
  }

  getSuppliers(): ISupplier[] {
    this.HTTPClient.getElement("Supplier").subscribe(
      (suppliers: ISupplier[]) => {
        this.suppliers = suppliers;
      }
    )
    return this.suppliers!;
  }

  saveSupplier(supplier: any): void {
    if(!this.childFormComponent.isUpdate){
      console.log("save");
      this.suppliers?.push(supplier.data);
    }else{
      console.log("update");
    }

  }

  getIdDelete(supplier: ISupplier): void {
    console.log(supplier);
    
  }

  getIdUpdate(supplier: ISupplier): void {
    console.log(supplier);
    this.childFormComponent.changeField(supplier);
  }

  redirect(): void {
    this.router.navigate(
      [`services/${'dato'}`], 
      { state: { data: 'Dato compuesto' }, 
      queryParams: { otroDato: '1' } }
    );
  }

}
