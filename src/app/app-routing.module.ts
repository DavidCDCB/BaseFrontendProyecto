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
import { AdministratorsManagementComponent } from './modules/AdministratorsManagement/AdministratorsManagement.component';
import { AdministratorsManagementModule } from './modules/AdministratorsManagement/AdministratorsManagement.module';
import { ProductsManagementComponent } from './modules/ProductsManagement/ProductsManagement.component';
import { ProductsManagementModule } from './modules/ProductsManagement/ProductsManagement.module';
import { RecepcionistsManagementComponent } from './modules/RecepcionistsManagement/RecepcionistsManagement.component';
import { RecepcionistsManagementModule } from './modules/RecepcionistsManagement/RecepcionistsManagement.module';
import { PurchasesManagementComponent } from './modules/PurchasesManagement/PurchasesManagement.component';
import { PurchasesManagementModule } from './modules/PurchasesManagement/PurchasesManagement.module';
import { ReportsManagementModule } from './modules/ReportsManagement/ReportsManagement.module';
import { ReportsManagementComponent } from './modules/ReportsManagement/ReportsManagement.component';
import { ProductReportModule } from './modules/ReportsManagement/Components/product-report/product-report.module';
import { ProductReportComponent } from './modules/ReportsManagement/Components/product-report/product-report.component';
import { PurchaseReportModule } from './modules/ReportsManagement/Components/purchase-report/purchase-report.module';
import { PurchaseReportComponent } from './modules/ReportsManagement/Components/purchase-report/purchase-report.component';
import { ServiceReportModule } from './modules/ReportsManagement/Components/service-report/service-report.module';
import { ServiceReportComponent } from './modules/ReportsManagement/Components/service-report/service-report.component';
import { VehicleReportModule } from './modules/ReportsManagement/Components/vehicle-report/vehicle-report.module';
import { VehicleReportComponent } from './modules/ReportsManagement/Components/vehicle-report/vehicle-report.component';

const routes: Routes = [
/*   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'suppliers',
  }, */
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
    path: 'administrators',
    component: AdministratorsManagementComponent
  },
  {
    path: 'recepcionists',
    component: RecepcionistsManagementComponent
  },
  {
    path: 'products',
    component: ProductsManagementComponent
  },
  {
    path: 'purchases',
    component: PurchasesManagementComponent
  },
  {
    path: 'reports',
    component: ReportsManagementComponent
  },
  {
    path: 'reports/product-report',
    component: ProductReportComponent
  },
  {
    path: 'reports/purchase-report',
    component: PurchaseReportComponent
  },
  {
    path: 'reports/service-report',
    component: ServiceReportComponent
  },
  {
    path: 'reports/vehicle-report',
    component: VehicleReportComponent
  },
  {
    path: 'services/:id',
    component: ServicesManagementComponent,
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
    PayrollsManagementModule,
    UsersManagementModule,
    LoginsManagementModule,
    AdministratorsManagementModule,
    RecepcionistsManagementModule,
    ProductsManagementModule,
    PurchasesManagementModule,
    ReportsManagementModule,
    ProductReportModule,
    PurchaseReportModule,
    ServiceReportModule,
    VehicleReportModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
