import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inconvenients-management',
  templateUrl: './inconvenients-management.component.html',
  styleUrls: ['./inconvenients-management.component.scss']
})
export class InconvenientsManagementComponent implements OnInit{
  @Input() requestId!: number;

  constructor() { }

  ngOnInit() {}
}
