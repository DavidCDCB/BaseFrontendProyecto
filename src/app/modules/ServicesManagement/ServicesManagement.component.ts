import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IServiceRequest, IRequest, IService } from 'src/app/core/models/ServiceRequest.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';
//import { IInconvenient } from 'src/app/core/models/Inconvenient.interface';

@Component({
  selector: 'app-ServicesManagement',
  templateUrl: './ServicesManagement.component.html',
  styleUrls: ['./ServicesManagement.component.scss']
})
export class ServicesManagementComponent implements OnInit {
  idClient!: string;
  @Input() requestId!: number;
  @ViewChild('childForm') childFormComponent!: ServiceFormComponent;
  nameEntityRequest: string = 'Request';
  nameEntityService: string = 'Service';
  requests: IRequest[] = [];
  service?: IService;
  // inconvenients: IInconvenient[] = [];


  constructor(
    private route: ActivatedRoute,
    private HTTPClientRequest: RequestsControllerService<IRequest>,
    private HTTPClientService: RequestsControllerService<IService>
  ) { }

  ngOnInit() {
    this.idClient = this.route.snapshot.paramMap.get('id')!;
    this.getRequests();
  }

  getRequests(): IRequest[] {
    this.HTTPClientRequest.getElement(this.nameEntityRequest+`/client/${this.idClient}`).subscribe({
      next: (requests: IRequest[]) => {
        this.requests = requests;
      },
      error: (error) => this.showToast('Error al obtener solicitudes', 'error')
    });
    return this.requests!;
  }

  getService(idService: string): IService {
    this.HTTPClientService.getOneElement(this.nameEntityService,idService).subscribe({
      next: (service: IService) => {
        this.service = service;
      },
      error: (error) => this.showToast('Error al obtener servicios', 'error')
    });
    return this.service!;
  }

  saveServiceRequest(serviceRequest: IServiceRequest): void {
    this.saveService(
      {
        name: serviceRequest.name,
        price: serviceRequest.price,
        description: serviceRequest.description,
        category: serviceRequest.category,
      },
      {
        starDate: this.changeDateFormat(serviceRequest.starDate),
        endDate: this.changeDateFormat(serviceRequest.endDate),
        state: serviceRequest.state,
        clientId: parseInt(this.idClient),
        serviceId: 0
      }
    );
  }

  saveService(service: IService, request: IRequest): void {
    this.service = service;
    if (!this.childFormComponent.isUpdate) {
      this.HTTPClientService.saveElement(this.nameEntityService, service).subscribe(
        (service: IService) => {
          request.serviceId = service.id!;
          this.saveRequest(request);
        }
      )
    } else {
      this.HTTPClientService.updateElement(this.nameEntityService, service, this.childFormComponent.idServiceForUpdate).subscribe(
        (service: IService) => {
          request.serviceId = service.id!;
          this.saveRequest(request);
        }
      )
    }
  }

  saveRequest(request: IRequest): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPClientRequest.saveElement(this.nameEntityRequest, request).subscribe(
        (request: IRequest) => {
          console.log(request);
          this.showToast('¡Amacenado correctamente!', 'success');
          this.requests?.push(request);
        }
      )
    } else {
      this.HTTPClientRequest.updateElement(this.nameEntityRequest, request, this.childFormComponent.idRequestForUpdate).subscribe(
        (request: IRequest) => {
          console.log(request);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.requests = this.requests?.map(x => x.id === request.id ? request : x);
          this.childFormComponent.isUpdate = false;
        }
      )
    }
  }

  updateRequestService(request: IRequest): void {
    this.childFormComponent.idRequestForUpdate = request.id!;
    this.childFormComponent.isUpdate = true;
    this.HTTPClientService.getOneElement(this.nameEntityService, request.serviceId.toString()).subscribe({
      next: (service: IService) => {
        this.service = service;
        this.childFormComponent.idServiceForUpdate = service.id!;
        this.childFormComponent.changeFields({
          starDate: request.starDate,
          endDate: request.endDate,
          name: service.name,
          price: service.price,
          description: service.description,
          category: service.category,
          state: request.state,
        });
      },
      error: (error) => this.showToast('Error al obtener servicios', 'error')
    });
    //this.childFormComponent.changeFields(client);
  }

  viewRequestService(request: IRequest): void {
    this.HTTPClientService.getOneElement(this.nameEntityService, request.serviceId.toString()).subscribe({
      next: (service: IService) => {
        this.childFormComponent.isView = true;
        this.childFormComponent.changeFields({
          starDate: request.starDate,
          endDate: request.endDate,
          name: service.name,
          price: service.price,
          description: service.description,
          category: service.category,
          state: request.state,
        });
      },
      error: (error) => this.showToast('Error al obtener servicios', 'error')
    });
  }

  deleteRequest(request: IRequest): void {
    this.showAlert('¿Está seguro de eliminar el registro?', () => {
      this.HTTPClientRequest.deleteElement(this.nameEntityRequest, request.id!).subscribe({
        next: (response: any) => {
          this.showToast('¡Eliminado correctamente!', 'success');
          this.requests = this.requests?.filter(x => x.id !== request.id);
        },
        error: (error) => this.showToast('Error al eliminar el registro', 'error')
      });
    });
  }

  changeDateFormat(date: string): string{
    return date.split('-').reverse().join('/');
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
