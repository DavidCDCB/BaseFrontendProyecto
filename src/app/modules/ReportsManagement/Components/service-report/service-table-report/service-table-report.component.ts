import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IService } from 'src/app/core/models/ServiceRequest.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-table-report',
  templateUrl: './service-table-report.component.html',
  styleUrls: ['./service-table-report.component.scss']
})
export class ServiceTableReportComponent {

  @Input()
  listOfServices?: IService[] = [];

  @Output()
  onIdService = new EventEmitter<number>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idService: number): void {
    this.router.navigate([`/services/${idService}`]);
  }

  setIdService(service: number): void {
    this.onIdService.emit(service);
  }

  filterList(): IService[] | undefined {
    return (this.filter) ? this.listOfServices?.filter(service => {
      return Object.values(service).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfServices!.reverse();
  }
}
