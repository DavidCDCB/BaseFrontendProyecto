import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }


  ngOnInit() {
  }
  validarToken(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }

}
