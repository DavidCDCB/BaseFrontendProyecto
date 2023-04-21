import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ISupplier } from 'src/app/models/Supplier.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import Swal from 'sweetalert2';

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
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Registro almacenado correctamente'
    })

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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
          this.suppliers?.push(supplier);
        }
      )
    }else{
      console.log("update");
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
