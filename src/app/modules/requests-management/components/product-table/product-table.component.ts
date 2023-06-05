import { Component } from '@angular/core';
import { IProduct } from 'src/app/core/models/Product.interface';
import { IService } from 'src/app/core/models/ServiceRequest.interface';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  listProducts?: IProduct[] = []
  filter?: string;




  filterListProduct(): IProduct[] | undefined {
    return (this.filter) ? this.listProducts?.filter(product => {
      return Object.values(product).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listProducts!.reverse();
  }



}
