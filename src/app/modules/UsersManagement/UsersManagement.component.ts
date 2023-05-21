import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { IUser } from 'src/app/core/models/User.interface';
import { UserFormComponent } from './Components/user-form/user-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-UsersManagement',
  templateUrl: './UsersManagement.component.html',
  styleUrls: ['./UsersManagement.component.scss']
})
export class UsersManagementComponent implements OnInit {

  @Input() idUser!: number;
  @ViewChild('childForm') childFormComponent!: UserFormComponent;
  users: IUser[] = [];
  nameEntity: string = 'User';

  constructor(private HTTPUser: RequestsControllerService<IUser>) { }

  ngOnInit(){
    this.getUsers();
  }

  setIdUser(idUser: number): void {
    this.idUser = idUser;
  }

  getUsers(): IUser[] {
    this.HTTPUser.getElement(this.nameEntity).subscribe({
      next: (users: IUser[]) => {
        this.users = users;
      },
      error: (error) => this.showToast('Error al obtener usuarios', 'error')
    });
    return this.users!;
  }

  saveUser(user: IUser): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPUser.saveElement(this.nameEntity, user).subscribe(
        (user: IUser) => {
          console.log(user);
          this.showToast('¡Amacenado correctamente!', 'success');
          this.users?.push(user);
        }
      )
    } else {
      this.HTTPUser.updateElement(this.nameEntity, user, this.childFormComponent.idForUpdate).subscribe(
        (user: IUser) => {
          console.log(user);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.users = this.users?.map(x => x.id === user.id ? user : x);
        }
      )
    }
  }

  deleteUser(user: IUser): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPUser.deleteElement(this.nameEntity, user.id).subscribe(
        (user: IUser) => {
          console.log(user);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.users = this.users?.filter(x => x.id !== user.id);
        }
      );
    });
  }

  updateUser(user: IUser): void {
    this.childFormComponent.idForUpdate = user.id;
    this.childFormComponent.changeFields(user);
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
