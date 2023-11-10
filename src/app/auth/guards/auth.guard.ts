import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core'; 
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';




export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (!usuarioService.isAuthenticated()) {
    Swal.fire(
      'Acceso denegado',
      'Debes iniciar sesión para acceder a este recurso!',
      'warning'
    )
    router.navigate(['/home']);
    return false;

  }
  
  if (state.url === '/login') {
    Swal.fire(
      'Acceso denegado',
      'Ya has iniciado sesión!',
      'warning'
    )
    router.navigate(['/home']);
    return false;
  }

  
  return true;
};
