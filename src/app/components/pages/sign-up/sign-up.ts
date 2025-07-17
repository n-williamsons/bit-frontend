import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../../services/signup';
import { ToastrService } from 'ngx-toastr'; //para notificaciones


@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  private router = inject(Router);
  private signupService = inject(SignupService);
  private toastrService = inject(ToastrService);


  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  handleSubmit() {
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;
      if (payload.password !== payload.confirmPassword){
        this.toastrService.error('Las contraseñas no coinciden', 'Error');
        return; 
      }
      this.signupService.userSignup(payload).subscribe((res: any) => {
        if (res.allOk) {
          console.log('User registered successfully:', res);
          this.toastrService.success('Usuario registrado exitosamente', 'Éxito');
          this.router.navigateByUrl('/sign-in');
        } else {
          console.log('User registration failed:', res);
          this.toastrService.error('Error al registrar usuario', 'Error');
        }
      }, (error) => {
        console.error('Error:', error);
        this.toastrService.error('Error de conexión', 'Error');
      });
    } else {
      this.toastrService.warning('Por favor completa todos los campos correctamente', 'Formulario inválido');
    }
  }
}
