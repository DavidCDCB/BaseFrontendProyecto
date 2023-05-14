import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { IAdministrator } from 'src/app/core/models/Administrator.interface';
import { AdministratorFormComponent } from './Components/administrator-form/administrator-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-AdministratorsManagement',
  templateUrl: './AdministratorsManagement.component.html',
  styleUrls: ['./AdministratorsManagement.component.scss']
})
export class AdministratorsManagementComponent implements OnInit {

  @Input() idAdministrator!: number;
  @ViewChild('childForm') childFormComponent!: AdministratorFormComponent;
  administrators: IAdministrator[] = [];
  nameEntity: string = 'Administrator';

  constructor(private HTTPAdministrator: RequestsControllerService<IAdministrator>) { }

  ngOnInit(){
    this.getAdministrators();
  }

  setIdAdministrator(idAdministrator: number): void {
    this.idAdministrator = idAdministrator;
  }

  getAdministrators(): IAdministrator[] {
    this.HTTPAdministrator.getElement(this.nameEntity).subscribe({
      next: (administrators: IAdministrator[]) => {
        this.administrators = administrators;
      },
      error: (error) => this.showToast('Error al obtener administradores', 'error')
    });
    return this.administrators!;
  }

  saveAdministrator(administrator: IAdministrator): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPAdministrator.saveElement(this.nameEntity, administrator).subscribe(
        (administrator: IAdministrator) => {
          console.log(administrator);
          this.showToast('¡Almacenado correctamente!', 'success');
          this.administrators?.push(administrator);
        }
      )
    } else {
      this.HTTPAdministrator.updateElement(this.nameEntity, administrator, this.childFormComponent.idForUpdate).subscribe(
        (administrator: IAdministrator) => {
          console.log(administrator);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.administrators = this.administrators?.map(x => x.id === administrator.id ? administrator : x);
        }
      )
    }
  }

  deleteAdministrator(administrator: IAdministrator): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPAdministrator.deleteElement(this.nameEntity, administrator.id).subscribe(
        (administrator: IAdministrator) => {
          console.log(administrator);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.administrators = this.administrators?.filter(x => x.id !== administrator.id);
        }
      );
    });
  }

  updateAdministrator(administrator: IAdministrator): void {
    this.childFormComponent.idForUpdate = administrator.id;
    this.childFormComponent.changeFields(administrator);
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
