import { Component } from '@angular/core';
import { IService } from 'src/app/core/models/ServiceRequest.interface';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.scss']
})
export class ServiceTableComponent {

  listServices?: IService[] = []
  filter?: string;

  filterListService(): IService[] | undefined {
    return (this.filter) ? this.listServices?.filter(service => {
      return Object.values(service).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listServices!.reverse();
  }

}
