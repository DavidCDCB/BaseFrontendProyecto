import { Component, OnChanges, ViewChild, Input, SimpleChanges } from '@angular/core';
import { IInconvenient } from 'src/app/core/models/Inconvenient.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { InconvenientFormComponent } from '../inconvenient-form/inconvenient-form.component';

@Component({
  selector: 'app-inconvenient-modal',
  templateUrl: './inconvenient-modal.component.html',
  styleUrls: ['./inconvenient-modal.component.scss']
})
export class InconvenientModalComponent implements OnChanges{
  @Input() requestId!: number;
  @ViewChild('childForm') childFormComponent!: InconvenientFormComponent;
  inconvenients: IInconvenient[] = [];
  nameEntity: string = 'Inconvenient';

  constructor(private HTTPClient: RequestsControllerService<IInconvenient>) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['requestId'].currentValue);
    changes['requestId'].currentValue ? this.getInconvenients() : null;
  }

  getInconvenients(): IInconvenient[] {
    this.HTTPClient.getElement(this.nameEntity+`/service/${this.requestId}`).subscribe({
      next: (inconvenients: IInconvenient[]) => {
        this.inconvenients = inconvenients;
      },
      error: (error) => this.showToast('Error al obtener vehiculos', 'error')
    });
    return this.inconvenients!;
  }

  saveInconvenient(inconvenient: IInconvenient): void {
    inconvenient.requestId = this.requestId;
    if (!this.childFormComponent.isUpdate) {
      this.HTTPClient.saveElement(this.nameEntity, inconvenient).subscribe(
        (inconvenient: IInconvenient) => {
          console.log(inconvenient);
          this.showToast('¡Amacenado correctamente!', 'success');
          this.inconvenients?.push(inconvenient);
        }
      )
    } else {
      this.HTTPClient.updateElement(this.nameEntity, inconvenient, this.childFormComponent.idForUpdate).subscribe(
        (inconvenient: IInconvenient) => {
          console.log(inconvenient);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.inconvenients = this.inconvenients?.map(x => x.id === inconvenient.id ? inconvenient : x);
        }
      )
    }
  }

  deleteInconvenient(inconvenient: IInconvenient): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPClient.deleteElement(this.nameEntity, inconvenient.id).subscribe(
        (inconvenient: IInconvenient) => {
          console.log(inconvenient);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.inconvenients = this.inconvenients?.filter(x => x.id !== inconvenient.id);
        }
      )
    });
  }

  updateInconvenient(inconvenient: IInconvenient): void {
    this.childFormComponent.idForUpdate = inconvenient.id;
    this.childFormComponent.changeFields(inconvenient);
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
