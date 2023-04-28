import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Navbar/Navbar.component';
import { SidebarComponent } from './Sidebar/Sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [NavbarComponent, SidebarComponent],
  exports: [NavbarComponent, SidebarComponent]
})
export class LayoutModule { }
