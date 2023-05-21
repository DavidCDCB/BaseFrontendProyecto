import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IPayroll } from 'src/app/core/models/Payroll.interface';

@Component({
  selector: 'app-payroll-table',
  templateUrl: './payroll-table.component.html',
  styleUrls: ['./payroll-table.component.scss']
})
export class PayrollTableComponent {
  @Input()
  listOfPayrolls?: IPayroll[] = [];

  @Output()
  onIdPayroll = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<IPayroll>();

  @Output()
  onUpdate = new EventEmitter<IPayroll>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idPayroll: number): void {
    this.router.navigate([`/services/${idPayroll}`]);
  }

  setIdPayroll(payroll: number): void {
    this.onIdPayroll.emit(payroll);
  }

  sendIdDelete(payroll: IPayroll): void {
    this.onDelete.emit(payroll);
  }

  sendIdUpdate(payroll: IPayroll): void {
    this.onUpdate.emit(payroll);
  }

  filterList(): IPayroll[] | undefined {
    return (this.filter) ? this.listOfPayrolls?.filter(payroll => {
      return Object.values(payroll).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfPayrolls!.reverse();
  }
}
