import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPurchase } from 'src/app/core/models/Purchase.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-table-report',
  templateUrl: './purchase-table-report.component.html',
  styleUrls: ['./purchase-table-report.component.scss']
})
export class PurchaseTableReportComponent {

  @Input()
  listOfPurchases?: IPurchase[] = [];

  @Output()
  onIdPurchase = new EventEmitter<number>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idPurchase: number): void {
    this.router.navigate([`/services/${idPurchase}`]);
  }

  setIdPurchase(purchase: number): void {
    this.onIdPurchase.emit(purchase);
  }

  filterList(): IPurchase[] | undefined {
    return (this.filter) ? this.listOfPurchases?.filter(purchase => {
      return Object.values(purchase).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfPurchases!.reverse();
  }
}
