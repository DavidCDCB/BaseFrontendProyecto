import { Component, Input, ViewChild } from '@angular/core';
import { IPayroll } from 'src/app/core/models/Payroll.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import Swal,{ SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-payrolls-management',
  templateUrl: './payrolls-management.component.html',
  styleUrls: ['./payrolls-management.component.scss']
})
export class PayrollsManagementComponent {

  @Input() idPayroll!: number;
  @ViewChild('childForm') childFormComponent!: PayrollFormComponent;
  payrolls: IPayroll[] = [];
  nameEntity: string = 'Payroll';

  constructor(private HTTPPayroll: RequestsControllerService<IPayroll>) { }

  ngOnInit(){
    this.getPayrolls();
  }

  setIdPayroll(idPayroll: number): void {
    this.idPayroll = idPayroll;
  }

  getPayrolls(): IPayroll[] {
    this.HTTPPayroll.getElement(this.nameEntity).subscribe({
      next: (payrolls: IPayroll[]) => {
        this.payrolls = payrolls;
      },
      error: (error) => this.showToast('Error al obtener payrolles', 'error')
    });
    return this.payrolls!;
  }

  savePayroll(payroll: IPayroll): void {
    if (!this.childFormComponent.isUpdate) {
      this.HTTPPayroll.saveElement(this.nameEntity, payroll).subscribe(
        (payroll: IPayroll) => {
          console.log(payroll);
          this.showToast('¡Amacenado correctamente!', 'success');
          this.payrolls?.push(payroll);
        }
      )
    } else {
      this.HTTPPayroll.updateElement(this.nameEntity, payroll, this.childFormComponent.idForUpdate).subscribe(
        (payroll: IPayroll) => {
          console.log(payroll);
          this.showToast('¡Actualizado correctamente!', 'info');
          this.payrolls = this.payrolls?.map(x => x.id === payroll.id ? payroll : x);
        }
      )
    }
  }

  deletePayroll(payroll: IPayroll): void {
    this.showAlert('¿Realmente desea eliminar el registro?', () => {
      this.HTTPPayroll.deleteElement(this.nameEntity, payroll.id).subscribe(
        (payroll: IPayroll) => {
          console.log(payroll);
          this.showToast('¡Eliminado correctamente!', 'warning');
          this.payrolls = this.payrolls?.filter(x => x.id !== payroll.id);
        }
      );
    });
  }

  updatePayroll(payroll: IPayroll): void {
    this.childFormComponent.idForUpdate = payroll.id;
    this.childFormComponent.changeFields(payroll);
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
