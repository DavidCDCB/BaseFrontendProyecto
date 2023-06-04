import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/core/models/Product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {

  @Input()
  listOfProducts?: IProduct[] = [];

  @Output()
  onIdProduct = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<IProduct>();

  @Output()
  onUpdate = new EventEmitter<IProduct>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idProduct: number): void {
    this.router.navigate([`/services/${idProduct}`]);
  }

  setIdProduct(product: number): void {
    this.onIdProduct.emit(product);
  }

  sendIdDelete(product: IProduct): void {
    this.onDelete.emit(product);
  }

  sendIdUpdate(product: IProduct): void {
    this.onUpdate.emit(product);
  }

  filterList(): IProduct[] | undefined {
    return (this.filter) ? this.listOfProducts?.filter(product => {
      return Object.values(product).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfProducts!.reverse();
  }
}
