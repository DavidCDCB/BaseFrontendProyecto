import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMechanic } from 'src/app/core/models/Mechanic.interface';

@Component({
  selector: 'app-mechanic-table',
  templateUrl: './mechanic-table.component.html',
  styleUrls: ['./mechanic-table.component.scss']
})
export class MechanicTableComponent {
  @Input()
  listOfMechanics?: IMechanic[] = [];


}
