import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierManagementModule } from './modules/SuppliersManagement/SupplierManagement.module';
import { SupplierManagementComponent } from './modules/SuppliersManagement/SupplierManagement.component';
import { ClientsManagementModule } from './modules/ClientsManagement/ClientsManagement.module';
import { ClientsManagementComponent } from './modules/ClientsManagement/ClientsManagement.component';
import { ServicesManagementComponent } from './modules/ServicesManagement/ServicesManagement.component';
import { ServicesManagementModule } from './modules/ServicesManagement/ServicesManagement.module';
import { MechanicsManagementModule } from './modules/mechanics-management/mechanics-management.module';
import { MechanicsManagementComponent } from './modules/mechanics-management/mechanics-management.component';
import { PayrollsManagementComponent } from './modules/payrolls-management/payrolls-management.component';
import { PayrollsManagementModule } from './modules/payrolls-management/payrolls-management.module';

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
    path: 'mechanics',
    component: MechanicsManagementComponent,
  },
  {
    path: 'payrolls',
    component: PayrollsManagementComponent,
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
    ServicesManagementModule,
    MechanicsManagementModule,
    PayrollsManagementModule

  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
