
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Solicitacao,
  SolicitacaoService
} from '../../services/solicitacao.service';

@Component({
  selector: 'app-solicitacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitacoes.component.html',
  styleUrl: './solicitacoes.component.css'
})
export class SolicitacoesComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];
  carregando = false;
  erro = '';

  constructor(private solicitacaoService: SolicitacaoService) {}

  ngOnInit(): void {
    this.listarSolicitacoes();
  }

  listarSolicitacoes(): void {
    this.carregando = true;
    this.erro = '';

    this.solicitacaoService.listar().subscribe({
      next: (dados) => {
        this.solicitacoes = dados;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar solicitações:', error);
        this.erro = 'Não foi possível carregar as solicitações.';
        this.carregando = false;
      }
    });
  }
}
