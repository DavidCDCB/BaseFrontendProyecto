import { Component, EventEmitter, Input, Output } from '@angular/core';
import IClient from 'src/app/core/models/Client.interface';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent {

  @Input()
  listOfClients?: IClient[] = [];

  @Output()
  onDelete = new EventEmitter<IClient>();

  @Output()
  onUpdate = new EventEmitter<IClient>();

  filter?: string;

  sendIdDelete(supplier: IClient): void {
    this.onDelete.emit(supplier);
  }

  sendIdUpdate(supplier: IClient): void {
    this.onUpdate.emit(supplier);
  }

  filterList(): IClient[] | undefined {
    return (this.filter) ? this.listOfClients?.filter(client => {
      return Object.values(client).join('').toLowerCase().includes(this.filter!.toLowerCase()); 
    }).reverse() : this.listOfClients!.reverse();
  }
}
