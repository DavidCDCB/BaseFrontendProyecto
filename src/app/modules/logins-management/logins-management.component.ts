import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/core/models/Login.interface';
import { IRequest } from 'src/app/core/models/Request.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-logins-management',
  templateUrl: './logins-management.component.html',
  styleUrls: ['./logins-management.component.scss']
})
export class LoginsManagementComponent implements OnInit {
  @Output()
  onSubmit = new EventEmitter<ILogin>();
  loginForm!: FormGroup;
  isUpdate: boolean = false;
  idForUpdate: number = 0;
  nameEntity: string = 'User';
  nameHome: string = '/mechanics';

  constructor(private formBuilder: FormBuilder,
    private httpLogin: RequestsControllerService<ILogin>,
    private router: Router) { }
  ngOnInit() {
    // this.checkLocalStorage();
    this.initForm();
  }

  // checkLocalStorage(): void {
  //   if (localStorage.getItem('token') != null ) {
  //     let tokenVerif = localStorage.getItem('token');
  //     //validar que el token con validateToken service
  //     this.httpLogin.validateToken(tokenVerif!).subscribe(
  //       (response: any) => {
  //         let data: IRequest = response;
  //         if (data.status == "ok") {
  //           this.router.navigate([this.nameHome]);
  //         }
  //         else {
  //           this.showToast(data.status, 'warning');
  //         }
  //       }
  //     );
  //   }
  // }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['JoseAntonio76@corpfolder.com', [Validators.required]],
      password: ['Incrasar', [Validators.required]]
    })
  }

  /**
   * saveLogin -> Guarda un login en la base de datos y
   * devuelve un token para el usuario
   * @param login -> ILogin
   * @returns void
   * @example
   *
   */
  saveLogin(): void {
    console.log(this.loginForm.value);
    let login: ILogin = this.loginForm.value;
    this.httpLogin.authenticateElement(this.nameEntity, login).subscribe(
      (response:any) => {
        let data : IRequest = response;
        console.log(data);
        if (data.status == "ok") {
          this.showToast('Credenciales aceptadas', 'success');
          localStorage.setItem('token', data.result);
          localStorage.setItem('role', data.role);
          this.router.navigate(['/mechanics']);
        }
        else {
          this.showToast(data.status, 'warning');
        }

      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  checkInput(input: string): boolean {
    const field = this.loginForm.get(input);
    return field!.pristine === false && field!.errors != null;
  }

  changeFields(element: ILogin): void {
    this.isUpdate = true;
    console.log(element);
    if (element) {
      this.loginForm.patchValue(element);
    }
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

  showAlert(text: string, action: Function): void {
    Swal.fire({
      title: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        action();
      }
    });
  }





}
