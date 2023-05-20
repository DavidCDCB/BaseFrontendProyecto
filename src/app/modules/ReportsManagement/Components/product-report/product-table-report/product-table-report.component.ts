import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/core/models/Product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table-report',
  templateUrl: './product-table-report.component.html',
  styleUrls: ['./product-table-report.component.scss']
})
export class ProductTableReportComponent {

  @Input()
  listOfProducts?: IProduct[] = [];

  @Output()
  onIdProduct = new EventEmitter<number>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idProduct: number): void {
    this.router.navigate([`/services/${idProduct}`]);
  }

  setIdProduct(product: number): void {
    this.onIdProduct.emit(product);
  }

  filterList(): IProduct[] | undefined {
    return (this.filter) ? this.listOfProducts?.filter(product => {
      return Object.values(product).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfProducts!.reverse();
  }
}
