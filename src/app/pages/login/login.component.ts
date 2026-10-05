import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  erro = '';
  carregando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.erro = '';
    this.carregando = true;

    this.authService.login(
      this.username,
      this.password
    ).subscribe({
      next: () => {
        this.carregando = false;

        // Após o login, vai para a página inicial
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro no login:', error);

        this.carregando = false;
        this.erro = 'Usuário ou senha inválidos.';
      }
    });
  }
}
