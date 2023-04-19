import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierManagementModule } from './modules/SupplierManagement/SupplierManagement.module';
import { SupplierManagementComponent } from './modules/SupplierManagement/SupplierManagement.component';
import { ClientsManagementModule } from './modules/ClientsManagement/ClientsManagement.module';
import { ClientsManagementComponent } from './modules/ClientsManagement/ClientsManagement.component';
import { ServicesManagementComponent } from './modules/ServicesManagement/ServicesManagement.component';
import { ServicesManagementModule } from './modules/ServicesManagement/ServicesManagement.module';


const routes: Routes = [
  {
    path: 'suppliers',
    component: SupplierManagementComponent,
  },
  {
    path: 'clients',
    component: ClientsManagementComponent,
  },
  {
    path: 'services/:id',
    component: ServicesManagementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    SupplierManagementModule,
    ClientsManagementModule,
    ServicesManagementModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
