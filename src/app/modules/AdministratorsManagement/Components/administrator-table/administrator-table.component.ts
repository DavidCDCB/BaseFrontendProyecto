import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAdministrator } from 'src/app/core/models/Administrator.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator-table',
  templateUrl: './administrator-table.component.html',
  styleUrls: ['./administrator-table.component.scss']
})
export class AdministratorTableComponent {

  @Input()
  listOfAdministrators?: IAdministrator[] = [];

  @Output()
  onIdAdministrator = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<IAdministrator>();

  @Output()
  onUpdate = new EventEmitter<IAdministrator>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idAdministrator: number): void {
    this.router.navigate([`/services/${idAdministrator}`]);
  }

  setIdAdministrator(administrator: number): void {
    this.onIdAdministrator.emit(administrator);
  }

  sendIdDelete(administrator: IAdministrator): void {
    this.onDelete.emit(administrator);
  }

  sendIdUpdate(administrator: IAdministrator): void {
    this.onUpdate.emit(administrator);
  }

  filterList(): IAdministrator[] | undefined {
    return (this.filter) ? this.listOfAdministrators?.filter(administrator => {
      return Object.values(administrator).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfAdministrators!.reverse();
  }
}
