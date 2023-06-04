import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IPurchase } from 'src/app/core/models/Purchase.interface';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss']
})
export class PurchaseReportComponent {

  @Input() idPurchase!: number;
  purchases: IPurchase[] = [];
  nameEntity: string = 'Purchase';

  constructor(private HTTPPurchase: RequestsControllerService<IPurchase>) { }

  ngOnInit(){
    this.getPurchases();
  }

  setIdPurchase(idPurchase: number): void {
    this.idPurchase = idPurchase;
  }

  getPurchases(): IPurchase[] {
    this.HTTPPurchase.getElement(this.nameEntity).subscribe({
      next: (purchases: IPurchase[]) => {
        this.purchases = purchases;
      },
      error: (error) => this.showToast('Error al obtener purchaseos', 'error')
    });
    return this.purchases!;
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
      PDF.save('purchase-report.pdf');
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
