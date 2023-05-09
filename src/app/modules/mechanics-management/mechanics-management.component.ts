import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IMechanic } from 'src/app/core/models/Mechanic.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { MechanicFormComponent } from './components/mechanic-form/mechanic-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-mechanics-management',
  templateUrl: './mechanics-management.component.html',
  styleUrls: ['./mechanics-management.component.scss']
})
export class MechanicsManagementComponent {

  @Input() idMechanic!: number;
  @ViewChild('childForm') childFormComponent!: MechanicFormComponent;
  mechanics: IMechanic[] = [];
  nameEntity: string = 'Mechanic';

  constructor(private HTTPMechanic: RequestsControllerService<IMechanic>) { }

  ngOnInit() {
    let token = this.getTokens();
    console.log(token);
    this.getMechanics();
  }

  getTokens(): string {
    return localStorage.getItem('token')!;
  }

  setIdMechanic(idMechanic: number): void {
    this.idMechanic = idMechanic;
  }

  getMechanics(): IMechanic[] {
    this.HTTPMechanic.getElement(this.nameEntity).subscribe({
      next: (mechanics: IMechanic[]) => {
        this.mechanics = mechanics;
      },
      error: (error) => this.showToast('Error al obtener mechanices', 'error')
    });
    return this.mechanics!;
  }

  saveMechanic(mechanic: IMechanic): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPMechanic.saveElement(this.nameEntity, mechanic).subscribe(
        (mechanic: IMechanic) => {
          console.log(mechanic);
          this.showToast('¡Amacenado correctamente!', 'success');
          this.mechanics?.push(mechanic);
        }
      )
    } else {
      this.HTTPMechanic.updateElement(this.nameEntity, mechanic, this.childFormComponent.idForUpdate).subscribe(
        (mechanic: IMechanic) => {
          console.log(mechanic);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.mechanics = this.mechanics?.map(x => x.id === mechanic.id ? mechanic : x);
        }
      )
    }
  }

  deleteMechanic(mechanic: IMechanic): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPMechanic.deleteElement(this.nameEntity, mechanic.id).subscribe(
        (mechanic: IMechanic) => {
          console.log(mechanic);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.mechanics = this.mechanics?.filter(x => x.id !== mechanic.id);
        }
      );
    });
  }

  updateMechanic(mechanic: IMechanic): void {
    this.childFormComponent.idForUpdate = mechanic.id;
    this.childFormComponent.changeFields(mechanic);
  }

  showToast(text: string, icon: SweetAlertIcon): void {
    Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
    }).fire({
      icon: icon,
      title: text
    });
  }

  showAlert(text: string, action: Function): void {
    Swal.fire({
      title: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        action();
      }
    });
  }

}
