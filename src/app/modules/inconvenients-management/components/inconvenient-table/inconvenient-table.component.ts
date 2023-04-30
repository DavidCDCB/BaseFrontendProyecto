import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IInconvenient } from 'src/app/core/models/Inconvenient.interface';

@Component({
  selector: 'app-inconvenient-table',
  templateUrl: './inconvenient-table.component.html',
  styleUrls: ['./inconvenient-table.component.scss']
})
export class InconvenientTableComponent {
  @Input()
  listOfInconvenients?: IInconvenient[] = [];

  @Output()
  onDelete = new EventEmitter<IInconvenient>();

  @Output()
  onUpdate = new EventEmitter<IInconvenient>();

  filter?: string;

  sendIdDelete(inconvenient: IInconvenient): void {
    this.onDelete.emit(inconvenient);
  }

  sendIdUpdate(inconvenient: IInconvenient): void {
    this.onUpdate.emit(inconvenient);
  }

  filterList(): IInconvenient[] | undefined {
    return (this.filter) ? this.listOfInconvenients?.filter(inconvenient => {
      return Object.values(inconvenient).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfInconvenients!.reverse();
  }

}
