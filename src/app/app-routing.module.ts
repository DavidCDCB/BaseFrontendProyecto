import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierManagementModule } from './modules/SuppliersManagement/SupplierManagement.module';
import { SupplierManagementComponent } from './modules/SuppliersManagement/SupplierManagement.component';
import { ClientsManagementModule } from './modules/ClientsManagement/ClientsManagement.module';
import { ClientsManagementComponent } from './modules/ClientsManagement/ClientsManagement.component';
import { ServicesManagementComponent } from './modules/ServicesManagement/ServicesManagement.component';
import { ServicesManagementModule } from './modules/ServicesManagement/ServicesManagement.module';

const routes: Routes = [
/*   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'suppliers',
  }, */
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
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    SupplierManagementModule,
    ClientsManagementModule,
    ServicesManagementModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
