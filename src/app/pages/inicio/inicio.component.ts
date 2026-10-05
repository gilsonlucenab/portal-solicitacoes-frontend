import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  sair(): void {

    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao sair:', error);

        // Mesmo se ocorrer algum erro no logout,
        // volta para a tela de login.
        this.router.navigate(['/login']);
      }
    });

  }
}
