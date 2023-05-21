import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPurchase } from 'src/app/core/models/Purchase.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.scss']
})
export class PurchaseTableComponent {

  @Input()
  listOfPurchases?: IPurchase[] = [];

  @Output()
  onIdPurchase = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<IPurchase>();

  @Output()
  onUpdate = new EventEmitter<IPurchase>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idPurchase: number): void {
    this.router.navigate([`/services/${idPurchase}`]);
  }

  setIdPurchase(purchase: number): void {
    this.onIdPurchase.emit(purchase);
  }

  sendIdDelete(purchase: IPurchase): void {
    this.onDelete.emit(purchase);
  }

  sendIdUpdate(purchase: IPurchase): void {
    this.onUpdate.emit(purchase);
  }

  filterList(): IPurchase[] | undefined {
    return (this.filter) ? this.listOfPurchases?.filter(purchase => {
      return Object.values(purchase).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfPurchases!.reverse();
  }
}
