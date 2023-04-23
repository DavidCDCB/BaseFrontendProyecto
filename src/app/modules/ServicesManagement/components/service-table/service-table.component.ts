import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRequest } from 'src/app/core/models/ServiceRequest.interface';


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

  filter?: string;

  constructor() { }

  sendIdDelete(request: IRequest): void {
    this.onDelete.emit(request);
  }

  sendIdUpdate(request: IRequest): void {
    this.onUpdate.emit(request);
  }

  sendIdView(request: IRequest): void {
    this.onView.emit(request);
  }

  filterList(): IRequest[] | undefined {
    return (this.filter) ? this.listOfRequest?.filter(client => {
      return Object.values(client).join('').toLowerCase().includes(this.filter!.toLowerCase()); 
    }).reverse() : this.listOfRequest!.reverse();
  }

}
