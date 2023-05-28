import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { IPurchase } from 'src/app/core/models/Purchase.interface';
import { PurchaseFormComponent } from './Components/purchase-form/purchase-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-PurchasesManagement',
  templateUrl: './PurchasesManagement.component.html',
  styleUrls: ['./PurchasesManagement.component.scss']
})
export class PurchasesManagementComponent implements OnInit {

  @Input() idPurchase!: number;
  @ViewChild('childForm') childFormComponent!: PurchaseFormComponent;
  purchases: IPurchase[] = [];
  nameEntity: string = 'Purchase';

  constructor(private HTTPPurchase: RequestsControllerService<IPurchase>) { }

  ngOnInit(){
    this.getPurchases();
  }

  setIdPurchase(idPurchase: number): void {
    this.idPurchase = idPurchase;
  }

  getPurchases(): IPurchase[] {
    this.HTTPPurchase.getElement(this.nameEntity).subscribe({
      next: (purchases: IPurchase[]) => {
        this.purchases = purchases;
      },
      error: (error) => this.showToast('Error al obtener compras', 'error')
    });
    return this.purchases!;
  }

  savePurchase(purchase: IPurchase): void {
    if (!this.childFormComponent.isUpdate) {
      purchase.datePurchase = this.changeDateFormat(purchase.datePurchase);
      this.HTTPPurchase.saveElement(this.nameEntity, purchase).subscribe(
        (purchase: IPurchase) => {
          console.log(purchase);
          this.showToast('¡Almacenado correctamente!', 'success');
          this.purchases?.push(purchase);
        }
      )
    } else {
      purchase.datePurchase = this.changeDateFormat(purchase.datePurchase);
      this.HTTPPurchase.updateElement(this.nameEntity, purchase, this.childFormComponent.idForUpdate).subscribe(
        (purchase: IPurchase) => {
          console.log(purchase);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.purchases = this.purchases?.map(x => x.id === purchase.id ? purchase : x);
        }
      )
    }
  }

  deletePurchase(purchase: IPurchase): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPPurchase.deleteElement(this.nameEntity, purchase.id).subscribe(
        (purchase: IPurchase) => {
          console.log(purchase);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.purchases = this.purchases?.filter(x => x.id !== purchase.id);
        }
      );
    });
  }

  updatePurchase(purchase: IPurchase): void {
    this.childFormComponent.idForUpdate = purchase.id;
    purchase.datePurchase = this.changeDateFormat(purchase.datePurchase);
    this.childFormComponent.changeFields(purchase);
  }

  changeDateFormat(date: string): string{
    return date.split('-').reverse().join('/');
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

}
