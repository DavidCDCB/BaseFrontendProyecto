import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRecepcionist } from 'src/app/core/models/Recepcionist.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepcionist-table',
  templateUrl: './recepcionist-table.component.html',
  styleUrls: ['./recepcionist-table.component.scss']
})
export class RecepcionistTableComponent {

  @Input()
  listOfRecepcionists?: IRecepcionist[] = [];

  @Output()
  onIdRecepcionist = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<IRecepcionist>();

  @Output()
  onUpdate = new EventEmitter<IRecepcionist>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idRecepcionist: number): void {
    this.router.navigate([`/services/${idRecepcionist}`]);
  }

  setIdRecepcionist(recepcionist: number): void {
    this.onIdRecepcionist.emit(recepcionist);
  }

  sendIdDelete(recepcionist: IRecepcionist): void {
    this.onDelete.emit(recepcionist);
  }

  sendIdUpdate(recepcionist: IRecepcionist): void {
    this.onUpdate.emit(recepcionist);
  }

  filterList(): IRecepcionist[] | undefined {
    return (this.filter) ? this.listOfRecepcionists?.filter(recepcionist => {
      return Object.values(recepcionist).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfRecepcionists!.reverse();
  }
}
