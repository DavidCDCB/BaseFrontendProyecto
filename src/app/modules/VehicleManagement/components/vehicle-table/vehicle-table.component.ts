import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVehicle } from 'src/app/core/models/Vehicle.interface.ts';

@Component({
  selector: 'app-vehicle-table',
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.scss']
})
export class VehicleTableComponent {

  @Input()
  listOfVehicles?: IVehicle[] = [];

  @Output()
  onDelete = new EventEmitter<IVehicle>();

  @Output()
  onUpdate = new EventEmitter<IVehicle>();

  filter?: string;

  sendIdDelete(vehicle: IVehicle): void {
    this.onDelete.emit(vehicle);
  }

  sendIdUpdate(vehicle: IVehicle): void {
    this.onUpdate.emit(vehicle);
  }

  filterList(): IVehicle[] | undefined {
    return (this.filter) ? this.listOfVehicles?.filter(vehicle => {
      return Object.values(vehicle).join('').toLowerCase().includes(this.filter!.toLowerCase()); 
    }).reverse() : this.listOfVehicles!.reverse();
  }
}
