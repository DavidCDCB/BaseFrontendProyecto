import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import ISupplier from 'src/app/core/models/Supplier.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';

@Component({
  selector: 'app-SupplierManagement',
  templateUrl: './SupplierManagement.component.html',
  styleUrls: ['./SupplierManagement.component.scss']
})
export class SupplierManagementComponent implements OnInit {

  @ViewChild('childForm') childFormComponent!: SupplierFormComponent;
  suppliers: ISupplier[] = [];
  nameEntity: string = 'Supplier';

  constructor(private router: Router, private HTTPClient: RequestsControllerService<ISupplier>) { }

  ngOnInit() {
    this.getSuppliers();
  }

  getSuppliers(): ISupplier[] {
    this.HTTPClient.getElement(this.nameEntity).subscribe({
      next: (suppliers: ISupplier[]) => {
        this.suppliers = suppliers;
      },
      error: (error) => this.showToast('Error al obtener proveedores', 'error')
    });
    return this.suppliers!;
  }

  saveSupplier(supplier: ISupplier): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPClient.saveElement(this.nameEntity, supplier).subscribe(
        (supplier: ISupplier) => {
          console.log(supplier);
          this.showToast('¡Amacenado correctamente!', 'success');
          this.suppliers?.push(supplier);
        }
      )
    } else {
      this.HTTPClient.updateElement(this.nameEntity, supplier, this.childFormComponent.idForUpdate).subscribe(
        (supplier: ISupplier) => {
          console.log(supplier);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.suppliers = this.suppliers?.map(x => x.id === supplier.id ? supplier : x);
        }
      )
    }
  }

  deleteSupplier(supplier: ISupplier): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPClient.deleteElement(this.nameEntity, supplier.id).subscribe(
        (supplier: ISupplier) => {
          console.log(supplier);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.suppliers = this.suppliers?.filter(x => x.id !== supplier.id);
        }
      );
    });
  }

  updateSupplier(supplier: ISupplier): void {
    this.childFormComponent.idForUpdate = supplier.id;
    this.childFormComponent.changeFields(supplier);
  }

  showToast(text: string, icon: SweetAlertIcon): void {
    Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
    }).fire({
      icon: icon,
      title: text
    });
  }

  showAlert(text: string, action: Function): void {
    Swal.fire({
      title: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        action();
      }
    });
  }

  redirect(): void {
    this.router.navigate(
      [`services/${'dato'}`],
      {
        state: { data: 'Dato compuesto' },
        queryParams: { otroDato: '1' }
      }
    );
  }

}
