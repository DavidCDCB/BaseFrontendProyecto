import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IVehicle } from 'src/app/core/models/Vehicle.interface';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-vehicle-report',
  templateUrl: './vehicle-report.component.html',
  styleUrls: ['./vehicle-report.component.scss']
})
export class VehicleReportComponent {

  @Input() idVehicle!: number;
  vehicles: IVehicle[] = [];
  nameEntity: string = 'Vehicle';

  constructor(private HTTPVehicle: RequestsControllerService<IVehicle>) { }

  ngOnInit(){
    this.getVehicles();
  }

  setIdVehicle(idVehicle: number): void {
    this.idVehicle = idVehicle;
  }

  getVehicles(): IVehicle[] {
    this.HTTPVehicle.getElement(this.nameEntity).subscribe({
      next: (vehicles: IVehicle[]) => {
        this.vehicles = vehicles;
      },
      error: (error) => this.showToast('Error al obtener vehiculos', 'error')
    });
    return this.vehicles!;
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
      PDF.save('vehicle-report.pdf');
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
