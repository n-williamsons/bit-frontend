import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; //para notificaciones
import { SigninService } from '../../../services/signin';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  router = inject(Router);
  signinService = inject(SigninService);
  toastrService = inject(ToastrService);

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.loginForm.valid) {
      this.signinService
        .loginUser(this.loginForm.value)
        .subscribe((res: any) => {
          if (res.allOk) {
            console.log('res:', res);
            this.toastrService.success('Login successful');
            localStorage.setItem('token', res.data);
            this.router.navigateByUrl('/menu');
          } }, (err: any) => { 
          this.toastrService.error(err.statusText, '¡Error al iniciar sesión!' );
               });
    } else {
     
      this.toastrService.warning('¡Inicio de sesión fallido!, todos los campos son requeridos', 'Error');
    }
  }
}