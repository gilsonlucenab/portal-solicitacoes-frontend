import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get<{ autenticado: boolean }>(
    'http://localhost:8080/api/auth/me',
    {
      withCredentials: true
    }
  ).pipe(

    map((resposta) => {

      if (resposta.autenticado) {
        return true;
      }

      router.navigate(['/login']);
      return false;
    }),

    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })

  );
};
