import { inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SigninService } from '../services/signin';

export const activateGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const signinService = inject(SigninService);

  if (signinService.isUserLoggedIn()) {
    return true; // El usuario está logueado, permite el acceso
  } else {
    router.navigateByUrl('/sign-in'); // Redirige al usuario a la página de inicio de sesión
    //No se usa (this) porque no es una clase
    return false; // El usuario no está logueado, bloquea el acceso
  }




  return true;
};
