import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { RequestsControllerService } from '../services/RequestsController.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosLoginGuard implements CanActivate {
  nameLogin: string = '/login';
  accesar: boolean = false;

  constructor(private httpLogin: RequestsControllerService<any>, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLocalStorage();
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
  async checkLocalStorage(): Promise<boolean> {
    if (localStorage.getItem('token') != null) {
      const tokenVerif = localStorage.getItem('token');

      try {
        const response: any = await this.httpLogin.validarToken(tokenVerif!).toPromise();

        if (response.status == "ok") {
          this.showToast(response.result, 'success');
          return true;
        } else {
          this.showToast(response.result, 'warning');
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
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
