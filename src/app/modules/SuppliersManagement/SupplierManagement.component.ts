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
      this.HTTPClient.saveElement("Supplier", supplier).subscribe(
        (supplier: ISupplier) => {
          console.log(supplier);
          this.suppliers?.unshift(supplier);
        }
      )
    }else{
      console.log("update");
      console.log(supplier);
      
      this.HTTPClient.updateElement("Supplier", supplier, this.childFormComponent.idForUpdate).subscribe(
        (supplier: ISupplier) => {
          console.log(supplier);
          this.suppliers = this.suppliers?.map(x => x.id === supplier.id ? supplier : x);
        }
      )
    }

  }

  deleteSupplier(supplier: ISupplier): void {
    this.HTTPClient.deleteElement("Supplier", supplier.id).subscribe(
      (supplier: ISupplier) => {
        console.log(supplier);
        this.suppliers = this.suppliers?.filter(x => x.id !== supplier.id);
      }
    );
  }

  updateSupplier(supplier: ISupplier): void {
    console.log(supplier);
    this.childFormComponent.idForUpdate = supplier.id;
    this.childFormComponent.changeFields(supplier);
  }

  redirect(): void {
    this.router.navigate(
      [`services/${'dato'}`], 
      { state: { data: 'Dato compuesto' }, 
      queryParams: { otroDato: '1' } }
    );
  }

}
