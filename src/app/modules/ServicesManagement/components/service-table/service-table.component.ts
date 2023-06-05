import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRequest } from 'src/app/core/models/ServiceRequest.interface';
import { Router } from '@angular/router';
import { IInconvenient } from 'src/app/core/models/Inconvenient.interface';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.scss']
})
export class ServiceTableComponent {

  @Input()
  listOfRequest?: IRequest[] = [];

  @Output()
  onDelete = new EventEmitter<IRequest>();

  @Output()
  onUpdate = new EventEmitter<IRequest>();

  @Output()
  onView = new EventEmitter<IRequest>();

/*   @Output()
  onIdInconvenient = new EventEmitter<number>(); */

  filter?: string;

  constructor(private router: Router) { }

/*   redirectToInconvenients(idRequest: number | undefined): void {
    // this.router.navigate([`/inconvenients/${idRequest}`]);
    this.onIdInconvenient.emit(idRequest);
  }

  redirectToProducts(idRequest: number | undefined): void {
    this.router.navigate([`/products/${idRequest}`]);
  } */

  sendIdDelete(request: IRequest): void {
    this.onDelete.emit(request);
  }

  sendIdUpdate(request: IRequest): void {
    this.onUpdate.emit(request);
  }

  sendIdView(request: IRequest): void {
    this.onView.emit(request);
  }
  redirectToRequest(idRequest: number | undefined): void {
    this.router.navigate([`/requests/${idRequest}`]);
  }

  filterList(): IRequest[] | undefined {
    return (this.filter) ? this.listOfRequest?.filter(client => {
      return Object.values(client).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfRequest!.reverse();
  }


}
