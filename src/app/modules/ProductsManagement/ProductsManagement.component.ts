import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { IProduct } from 'src/app/core/models/Product.interface';
import { ProductFormComponent } from './Components/product-form/product-form.component';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-ProductsManagement',
  templateUrl: './ProductsManagement.component.html',
  styleUrls: ['./ProductsManagement.component.scss']
})
export class ProductsManagementComponent implements OnInit {

  @Input() idProduct!: number;
  @ViewChild('childForm') childFormComponent!: ProductFormComponent;
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

  saveProduct(product: IProduct): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPProduct.saveElement(this.nameEntity, product).subscribe(
        (product: IProduct) => {
          console.log(product);
          this.showToast('¡Almacenado correctamente!', 'success');
          this.products?.push(product);
        }
      )
    } else {
      this.HTTPProduct.updateElement(this.nameEntity, product, this.childFormComponent.idForUpdate).subscribe(
        (product: IProduct) => {
          console.log(product);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.products = this.products?.map(x => x.id === product.id ? product : x);
        }
      )
    }
  }

  deleteProduct(product: IProduct): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPProduct.deleteElement(this.nameEntity, product.id).subscribe(
        (product: IProduct) => {
          console.log(product);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.products = this.products?.filter(x => x.id !== product.id);
        }
      );
    });
  }

  updateProduct(product: IProduct): void {
    this.childFormComponent.idForUpdate = product.id;
    this.childFormComponent.changeFields(product);
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
