import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PermisosLoginGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //validar si el usuario esta logueado y role es admin
    if (this.validarCredenciales()) {
      return true;
    }
    this.showToast("No tienes permisos para acceder a esta ruta", 'warning');
    return false;
  }

  validarCredenciales(): boolean {
    const allowedRoles = ['Administrator', 'Mechanic', 'Receptionist'];
    const userRole = localStorage.getItem('role');

    if (localStorage.getItem('token') != null && localStorage.getItem('role') != null) {
      if (allowedRoles.includes(userRole!)) {
        return true;
      }
    }
    return false;
  }
  showToast(text: string, icon: SweetAlertIcon): void {
    Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
    }).fire({
      icon: icon,
      title: text
    });
  }

}
