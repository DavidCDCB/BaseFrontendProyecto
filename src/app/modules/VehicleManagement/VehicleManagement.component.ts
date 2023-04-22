import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-VehicleManagement',
  templateUrl: './VehicleManagement.component.html',
  styleUrls: ['./VehicleManagement.component.scss']
})
export class VehicleManagementComponent implements OnInit {

  @Input()
  idClient?: number;

  constructor() { }

  ngOnInit() {
  }

}
