import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { IReceptionist } from 'src/app/core/models/Receptionist.interface';
import { ReceptionistFormComponent } from './Components/receptionist-form/receptionist-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-ReceptionistsManagement',
  templateUrl: './ReceptionistsManagement.component.html',
  styleUrls: ['./ReceptionistsManagement.component.scss']
})
export class ReceptionistsManagementComponent implements OnInit {

  @Input() idReceptionist!: number;
  @ViewChild('childForm') childFormComponent!: ReceptionistFormComponent;
  receptionists: IReceptionist[] = [];
  nameEntity: string = 'Receptionist';

  constructor(private HTTPReceptionist: RequestsControllerService<IReceptionist>) { }

  ngOnInit(){
    this.getReceptionists();
  }

  setIdReceptionist(idReceptionist: number): void {
    this.idReceptionist = idReceptionist;
  }

  getReceptionists(): IReceptionist[] {
    this.HTTPReceptionist.getElement(this.nameEntity).subscribe({
      next: (receptionists: IReceptionist[]) => {
        this.receptionists = receptionists;
      },
      error: (error) => this.showToast('Error al obtener recepcionistas', 'error')
    });
    return this.receptionists!;
  }

  saveReceptionist(receptionist: IReceptionist): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPReceptionist.saveElement(this.nameEntity, receptionist).subscribe(
        (receptionist: IReceptionist) => {
          console.log(receptionist);
          this.showToast('¡Almacenado correctamente!', 'success');
          this.receptionists?.push(receptionist);
        }
      )
    } else {
      this.HTTPReceptionist.updateElement(this.nameEntity, receptionist, this.childFormComponent.idForUpdate).subscribe(
        (receptionist: IReceptionist) => {
          console.log(receptionist);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.receptionists = this.receptionists?.map(x => x.id === receptionist.id ? receptionist : x);
        }
      )
    }
  }

  deleteReceptionist(receptionist: IReceptionist): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPReceptionist.deleteElement(this.nameEntity, receptionist.id).subscribe(
        (receptionist: IReceptionist) => {
          console.log(receptionist);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.receptionists = this.receptionists?.filter(x => x.id !== receptionist.id);
        }
      );
    });
  }

  updateReceptionist(receptionist: IReceptionist): void {
    this.childFormComponent.idForUpdate = receptionist.id;
    this.childFormComponent.changeFields(receptionist);
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
