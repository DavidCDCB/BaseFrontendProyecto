import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from 'src/app/core/models/User.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {

  @Input()
  listOfUsers?: IUser[] = [];

  @Output()
  onIdUser = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<IUser>();

  @Output()
  onUpdate = new EventEmitter<IUser>();

  filter?: string;

  constructor(private router: Router) { }

  redirectToService(idUser: number): void {
    this.router.navigate([`/services/${idUser}`]);
  }

  setIdUser(user: number): void {
    this.onIdUser.emit(user);
  }

  sendIdDelete(user: IUser): void {
    
    this.onDelete.emit(user);
  }

  sendIdUpdate(user: IUser): void {
    this.onUpdate.emit(user);
  }

  filterList(): IUser[] | undefined {
    return (this.filter) ? this.listOfUsers?.filter(user => {
      return Object.values(user).join('').toLowerCase().includes(this.filter!.toLowerCase());
    }).reverse() : this.listOfUsers!.reverse();
  }
}
