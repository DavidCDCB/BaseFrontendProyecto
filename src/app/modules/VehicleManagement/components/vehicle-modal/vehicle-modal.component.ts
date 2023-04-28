import { Component, OnChanges, ViewChild, Input, SimpleChanges } from '@angular/core';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { IVehicle } from 'src/app/core/models/Vehicle.interface.ts';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss']
})
export class VehicleModalComponent implements OnChanges {
  @Input() idClient!: number;
  @ViewChild('childForm') childFormComponent!: VehicleFormComponent;
  vehicles: IVehicle[] = [];
  nameEntity: string = 'Vehicle';

  constructor(private HTTPClient: RequestsControllerService<IVehicle>) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['idClient'].currentValue);
    changes['idClient'].currentValue ? this.getVehicles() : null;
  }

  getVehicles(): IVehicle[] {
    this.HTTPClient.getElement(this.nameEntity+`/client/${this.idClient}`).subscribe({
      next: (vehicles: IVehicle[]) => {
        this.vehicles = vehicles;
      },
      error: (error) => this.showToast('Error al obtener vehiculos', 'error')
    });
    return this.vehicles!;
  }

  saveVehicle(vehicle: IVehicle): void {
    vehicle.clientId = this.idClient;
    if (!this.childFormComponent.isUpdate) {
      this.HTTPClient.saveElement(this.nameEntity, vehicle).subscribe(
        (vehicle: IVehicle) => {
          console.log(vehicle);
          this.showToast('¡Amacenado correctamente!', 'success');
          this.vehicles?.push(vehicle);
        }
      )
    } else {
      this.HTTPClient.updateElement(this.nameEntity, vehicle, this.childFormComponent.idForUpdate).subscribe(
        (vehicle: IVehicle) => {
          console.log(vehicle);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.vehicles = this.vehicles?.map(x => x.id === vehicle.id ? vehicle : x);
        }
      )
    }
  }

  deleteVehicle(vehicle: IVehicle): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPClient.deleteElement(this.nameEntity, vehicle.id).subscribe(
        (vehicle: IVehicle) => {
          console.log(vehicle);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.vehicles = this.vehicles?.filter(x => x.id !== vehicle.id);
        }
      )
    });
  }

  updateVehicle(vehicle: IVehicle): void {
    this.childFormComponent.idForUpdate = vehicle.id;
    this.childFormComponent.changeFields(vehicle);
  }

  showAlert(message: string, callback: () => void): void {
    Swal.fire({
      title: '¡Atención!',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    })
  }

  showToast(message: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title: message,
      icon: icon,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
