import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMechanic } from 'src/app/core/models/Mechanic.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mechanic-table',
  templateUrl: './mechanic-table.component.html',
  styleUrls: ['./mechanic-table.component.scss']
})
export class MechanicTableComponent {

  @Input()
  listOfMechanics?: IMechanic[] = [];

  @Output()
  onIdMechanic = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<IMechanic>();

  @Output()
  onUpdate = new EventEmitter<IMechanic>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idMechanic: number): void {
    this.router.navigate([`/services/${idMechanic}`]);
  }

  setIdMechanic(mechanic: number): void {
    this.onIdMechanic.emit(mechanic);
  }

  sendIdDelete(mechanic: IMechanic): void {
    this.onDelete.emit(mechanic);
  }

  sendIdUpdate(mechanic: IMechanic): void {
    this.onUpdate.emit(mechanic);
  }

  filterList(): IMechanic[] | undefined {
    return (this.filter) ? this.listOfMechanics?.filter(mechanic => {
      return Object.values(mechanic).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfMechanics!.reverse();
  }

}
