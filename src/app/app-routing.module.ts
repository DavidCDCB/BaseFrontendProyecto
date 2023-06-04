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
import { UsersManagementModule } from './modules/UsersManagement/UsersManagement.module';
import { UsersManagementComponent } from './modules/UsersManagement/UsersManagement.component';
import { LoginsManagementComponent } from './modules/logins-management/logins-management.component';
import { LoginsManagementModule } from './modules/logins-management/logins-management.module';
import { PermisosLoginGuard } from './guards/permisos-login.guard';
import { RequestsManagementModule } from './modules/requests-management/requests-management.module';
import { RequestsManagementComponent } from './modules/requests-management/requests-management.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginsManagementComponent,
  },
  {
    path: 'suppliers',
    component: SupplierManagementComponent,
  },
  {
    path: 'clients',
    component: ClientsManagementComponent,
  },
  {
    path: 'users',
    component: UsersManagementComponent,
  },
  {
    path: 'services/:id',
    component: ServicesManagementComponent,
  },
  {
    path: 'mechanics',
    component: MechanicsManagementComponent,
    canActivate: [PermisosLoginGuard],
  },
  {
    path: 'payrolls',
    component: PayrollsManagementComponent,
  },
  {
    path: 'request',
    component: RequestsManagementComponent
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
    PayrollsManagementModule,
    UsersManagementModule,
    LoginsManagementModule,
    RequestsManagementModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
