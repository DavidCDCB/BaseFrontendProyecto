import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IReceptionist } from 'src/app/core/models/Receptionist.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptionist-table',
  templateUrl: './receptionist-table.component.html',
  styleUrls: ['./receptionist-table.component.scss']
})
export class ReceptionistTableComponent {

  @Input()
  listOfReceptionists?: IReceptionist[] = [];

  @Output()
  onIdReceptionist = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<IReceptionist>();

  @Output()
  onUpdate = new EventEmitter<IReceptionist>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idReceptionist: number): void {
    this.router.navigate([`/services/${idReceptionist}`]);
  }

  setIdReceptionist(receptionist: number): void {
    this.onIdReceptionist.emit(receptionist);
  }

  sendIdDelete(receptionist: IReceptionist): void {
    this.onDelete.emit(receptionist);
  }

  sendIdUpdate(receptionist: IReceptionist): void {
    this.onUpdate.emit(receptionist);
  }

  filterList(): IReceptionist[] | undefined {
    return (this.filter) ? this.listOfReceptionists?.filter(receptionist => {
      return Object.values(receptionist).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfReceptionists!.reverse();
  }
}
