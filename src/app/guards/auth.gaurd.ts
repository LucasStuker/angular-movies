import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), // Pega apenas o primeiro valor emitido para não ficar "ouvindo" para sempre
    map((user) => {
      // Se existe um usuário, ele está logado
      if (user) {
        return true; // Ótimo! Pode acessar a rota.
      }

      // Se não existe, ele não está logado
      router.navigate(['/login']); // Redireciona para a página de login
      return false; // Bloqueia o acesso à rota original.
    })
  );
};
