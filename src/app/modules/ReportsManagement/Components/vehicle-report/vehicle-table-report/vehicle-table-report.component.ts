import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVehicle } from 'src/app/core/models/Vehicle.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-table-report',
  templateUrl: './vehicle-table-report.component.html',
  styleUrls: ['./vehicle-table-report.component.scss']
})
export class VehicleTableReportComponent {

  @Input()
  listOfVehicles?: IVehicle[] = [];

  @Output()
  onIdVehicle = new EventEmitter<number>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idVehicle: number): void {
    this.router.navigate([`/services/${idVehicle}`]);
  }

  setIdVehicle(vehicle: number): void {
    this.onIdVehicle.emit(vehicle);
  }

  filterList(): IVehicle[] | undefined {
    return (this.filter) ? this.listOfVehicles?.filter(vehicle => {
      return Object.values(vehicle).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfVehicles!.reverse();
  }
}
