import {Component, OnInit, ViewChild,Input, Output, EventEmitter} from '@angular/core';
import { IInconvenient } from 'src/app/core/models/Inconvenient.interface';
import { IMechanic } from 'src/app/core/models/Mechanic.interface';
import { IProduct } from 'src/app/core/models/Product.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import { IRequestProdMechan } from 'src/app/core/models/RequestProdMechan.interface';
import { RequestFormComponent } from './components/request-form/request-form.component';

@Component({
  selector: 'app-requests-management',
  templateUrl: './requests-management.component.html',
  styleUrls: ['./requests-management.component.scss']
})
export class RequestsManagementComponent implements OnInit{
  idRequest!: number;
  @Input() requestId!: number;
  @ViewChild('childForm') childFormComponent!: RequestFormComponent;
  // @Output()
  // onDelete = new EventEmitter<IProduct>();
  // @Output()
  // onAdd = new EventEmitter<IProduct>();
  @Output()
  onIdInconvenient = new EventEmitter<number>();

  nameEntityRequest: string = 'Request/products';
  nameEntityMechanic: string = 'Mechanic';
  nameEntityProduct: string = 'Product';
  nameEntityInconvenient: string = 'Inconvenient';

  products: IProduct[] = [];
  inconvenients: IInconvenient[] = [];
  mechanics: IMechanic[] = [];
  request?: IRequestProdMechan = {
    RequestsId: this.idRequest,
    Mechanics: [],
    Products: [],
  };
  isUpdate: boolean = false;


    constructor(
      private route : ActivatedRoute,
      private HTTPClientRequest: RequestsControllerService<IRequestProdMechan>,
      private HTTPClientProduct: RequestsControllerService<IProduct>,
      private HTTPClientMechanic: RequestsControllerService<IMechanic>
    ) { }
    ngOnInit() {
      this.idRequest = parseInt(this.route.snapshot.paramMap.get('id')!);
      this.getMechanics();
      this.getProducts();
    }
    getRequests(): IRequestProdMechan[] {
      //TODO: implementar el metodo getRequests
      return null!;
    }



    getMechanics(): IMechanic[] {
      this.HTTPClientMechanic.getElement(this.nameEntityMechanic).subscribe({
        next: (mechanics: IMechanic[]) => {
          this.mechanics = mechanics;
        },
        error: (error) => this.showToast('Error al obtener mechanices', 'error')
      });
      return this.mechanics!;
    }
    getProducts(): IProduct[] {
      this.HTTPClientProduct.getElement(this.nameEntityProduct).subscribe({
        next: (products: IProduct[]) => {
          this.products = products;
        },
        error: (error) => this.showToast('Error al obtener productos', 'error')
      });
      return this.products!;
    }

    addMechanic(mechanic: IMechanic): void {
      console.log('adicionado');
      this.request!.Mechanics.push(mechanic);

    }

    deleteMechanic(mechanic: IMechanic): void {
      this.showAlert('¿Realmente desea eliminar el registro?', () => {
        console.log('Eliminando');
        if (this.request!.Mechanics.length > 0) {
          this.request!.Mechanics.splice(this.request!.Mechanics.indexOf(mechanic), 1);
        }

      });
    }


    deleteProduct(product: IProduct): void {
      this.showAlert('¿Realmente desea eliminar el registro?', () => {
        //quiero que adiciones el producto a la this.request.mechanics
        if(this.request!.Products.length > 0){
          this.request!.Products.splice(this.request!.Products.indexOf(product), 1);
        }

      });
    }

    addProduct(product: IProduct): void {
      console.log('adicionado');
      this.request!.Products.push(product);

    }

    enviarRequest(): void {
      this.request!.RequestsId = this.idRequest;
      console.log(this.request);
      if (this.request!.Mechanics.length > 0 && this.request!.Products.length > 0) {
        this.HTTPClientRequest.saveElement(this.nameEntityRequest, this.request!).subscribe({
          next: (request: IRequestProdMechan) => {
            this.showToast('Solicitud enviada correctamente', 'success');
            // this.childFormComponent.resetForm();
            console.log(request);
          },
          error: (error) => this.showToast('Error al enviar la solicitud', 'error')
        });
      } else {
        this.showToast('Debe seleccionar al menos un mecanico y un producto', 'warning');
      }
    }


    changeDateFormat(date: string): string{
      return date.split('-').reverse().join('/');
    }

    redirectToInconvenients(idRequest: number | undefined): void {
      // this.router.navigate([`/inconvenients/${idRequest}`]);
      this.onIdInconvenient.emit(idRequest);
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
