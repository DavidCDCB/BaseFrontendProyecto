import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISupplier } from 'src/app/models/Supplier.interface';

@Component({
  selector: 'app-supplier-table',
  templateUrl: './supplier-table.component.html',
  styleUrls: ['./supplier-table.component.scss']
})
export class SupplierTableComponent {

  @Input()
  listOfSuppliers?: ISupplier[] = [];

  @Output()
  onDelete = new EventEmitter<ISupplier>();

  @Output()
  onUpdate = new EventEmitter<ISupplier>();

  sendIdDelete(supplier: ISupplier): void {
    this.onDelete.emit(supplier);
  }

  sendIdUpdate(supplier: ISupplier): void {
    this.onUpdate.emit(supplier);
  }

}
