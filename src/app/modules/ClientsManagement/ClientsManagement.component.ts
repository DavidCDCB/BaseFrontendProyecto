import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import IClient from 'src/app/core/models/Client.interface';
import { ClientFormComponent } from './components/client-form/client-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-ClientsManagement',
  templateUrl: './ClientsManagement.component.html',
  styleUrls: ['./ClientsManagement.component.scss']
})
export class ClientsManagementComponent implements OnInit {

  @Input() idClient!: number;
  @ViewChild('childForm') childFormComponent!: ClientFormComponent;
  clients: IClient[] = [];
  nameEntity: string = 'Client';

  constructor(private HTTPClient: RequestsControllerService<IClient>) { }

  ngOnInit(){
    this.getClients();
  }

  setIdClient(idClient: number): void {
    this.idClient = idClient;
  }

  getClients(): IClient[] {
    this.HTTPClient.getElement(this.nameEntity).subscribe({
      next: (clients: IClient[]) => {
        this.clients = clients;
      },
      error: (error) => this.showToast('Error al obtener clientes', 'error')
    });
    return this.clients!;
  } 

  saveClient(client: IClient): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPClient.saveElement(this.nameEntity, client).subscribe(
        (client: IClient) => {
          console.log(client);
          this.showToast('¡Amacenado correctamente!', 'success');
          this.clients?.push(client);
        }
      )
    } else {
      this.HTTPClient.updateElement(this.nameEntity, client, this.childFormComponent.idForUpdate).subscribe(
        (client: IClient) => {
          console.log(client);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.clients = this.clients?.map(x => x.id === client.id ? client : x);
        }
      )
    }
  }

  deleteClient(client: IClient): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPClient.deleteElement(this.nameEntity, client.id).subscribe(
        (client: IClient) => {
          console.log(client);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.clients = this.clients?.filter(x => x.id !== client.id);
        }
      );
    });
  }

  updateClient(client: IClient): void {
    this.childFormComponent.idForUpdate = client.id;
    this.childFormComponent.changeFields(client);
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
