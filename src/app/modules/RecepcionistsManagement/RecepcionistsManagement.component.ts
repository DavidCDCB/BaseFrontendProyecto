import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { IRecepcionist } from 'src/app/core/models/Recepcionist.interface';
import { RecepcionistFormComponent } from './Components/recepcionist-form/recepcionist-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-RecepcionistsManagement',
  templateUrl: './RecepcionistsManagement.component.html',
  styleUrls: ['./RecepcionistsManagement.component.scss']
})
export class RecepcionistsManagementComponent implements OnInit {

  @Input() idRecepcionist!: number;
  @ViewChild('childForm') childFormComponent!: RecepcionistFormComponent;
  recepcionists: IRecepcionist[] = [];
  nameEntity: string = 'Recepcionist';

  constructor(private HTTPRecepcionist: RequestsControllerService<IRecepcionist>) { }

  ngOnInit(){
    this.getRecepcionists();
  }

  setIdRecepcionist(idRecepcionist: number): void {
    this.idRecepcionist = idRecepcionist;
  }

  getRecepcionists(): IRecepcionist[] {
    this.HTTPRecepcionist.getElement(this.nameEntity).subscribe({
      next: (recepcionists: IRecepcionist[]) => {
        this.recepcionists = recepcionists;
      },
      error: (error) => this.showToast('Error al obtener recepcionistas', 'error')
    });
    return this.recepcionists!;
  }

  saveRecepcionist(recepcionist: IRecepcionist): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPRecepcionist.saveElement(this.nameEntity, recepcionist).subscribe(
        (recepcionist: IRecepcionist) => {
          console.log(recepcionist);
          this.showToast('¡Almacenado correctamente!', 'success');
          this.recepcionists?.push(recepcionist);
        }
      )
    } else {
      this.HTTPRecepcionist.updateElement(this.nameEntity, recepcionist, this.childFormComponent.idForUpdate).subscribe(
        (recepcionist: IRecepcionist) => {
          console.log(recepcionist);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.recepcionists = this.recepcionists?.map(x => x.id === recepcionist.id ? recepcionist : x);
        }
      )
    }
  }

  deleteRecepcionist(recepcionist: IRecepcionist): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPRecepcionist.deleteElement(this.nameEntity, recepcionist.id).subscribe(
        (recepcionist: IRecepcionist) => {
          console.log(recepcionist);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.recepcionists = this.recepcionists?.filter(x => x.id !== recepcionist.id);
        }
      );
    });
  }

  updateRecepcionist(recepcionist: IRecepcionist): void {
    this.childFormComponent.idForUpdate = recepcionist.id;
    this.childFormComponent.changeFields(recepcionist);
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
