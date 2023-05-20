import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IProduct } from 'src/app/core/models/Product.interface';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent {

  @Input() idProduct!: number;
  products: IProduct[] = [];
  nameEntity: string = 'Product';

  constructor(private HTTPProduct: RequestsControllerService<IProduct>) { }

  ngOnInit(){
    this.getProducts();
  }

  setIdProduct(idProduct: number): void {
    this.idProduct = idProduct;
  }

  getProducts(): IProduct[] {
    this.HTTPProduct.getElement(this.nameEntity).subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
      },
      error: (error) => this.showToast('Error al obtener productos', 'error')
    });
    return this.products!;
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
      PDF.save('product-report.pdf');
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
