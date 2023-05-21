import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IService } from 'src/app/core/models/ServiceRequest.interface';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.scss']
})
export class ServiceReportComponent {

  @Input() idService!: number;
  services: IService[] = [];
  nameEntity: string = 'Service';

  constructor(private HTTPService: RequestsControllerService<IService>) { }

  ngOnInit(){
    this.getServices();
  }

  setIdService(idService: number): void {
    this.idService = idService;
  }

  getServices(): IService[] {
    this.HTTPService.getElement(this.nameEntity).subscribe({
      next: (services: IService[]) => {
        this.services = services;
      },
      error: (error) => this.showToast('Error al obtener servicios', 'error')
    });
    return this.services!;
  }


  @ViewChild('content') content: ElementRef;
  public SavePDF(): void {
    let DATA: any = document.getElementById('content');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('service-report.pdf');
    });
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
