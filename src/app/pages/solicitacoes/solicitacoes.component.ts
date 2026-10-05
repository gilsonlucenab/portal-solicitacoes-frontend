import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  Solicitacao,
  SolicitacaoService
} from '../../services/solicitacao.service';

@Component({
  selector: 'app-solicitacoes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './solicitacoes.component.html',
  styleUrl: './solicitacoes.component.css'
})

export class SolicitacoesComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];

  solicitacoesFiltradas: Solicitacao[] = [];

  filtroTitulo = '';
  filtroCategoria = '';
  filtroStatus = '';
  carregando = false;
  erro = '';

  // Controle da edição
  editando = false;
  solicitacaoEditandoId: number | null = null;

  // Controle da criação
  criando = false;

  formulario = {
    titulo: '',
    descricao: '',
    categoria: ''
  };

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
        this.solicitacoesFiltradas = dados;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar solicitações:', error);
        this.erro = 'Não foi possível carregar as solicitações.';
        this.carregando = false;
      }
    });
  }

  filtrarSolicitacoes(): void {
  const titulo = this.filtroTitulo.trim().toLowerCase();

  this.solicitacoesFiltradas = this.solicitacoes.filter(
    (solicitacao) => {

      const correspondeTitulo =
        !titulo ||
        solicitacao.titulo.toLowerCase().includes(titulo);

      const correspondeCategoria =
        !this.filtroCategoria ||
        solicitacao.categoria === this.filtroCategoria;

      const correspondeStatus =
        !this.filtroStatus ||
        solicitacao.status === this.filtroStatus;

      return (
        correspondeTitulo &&
        correspondeCategoria &&
        correspondeStatus
      );
    }
  );
}

limparFiltros(): void {
  this.filtroTitulo = '';
  this.filtroCategoria = '';
  this.filtroStatus = '';

  this.solicitacoesFiltradas = this.solicitacoes;
}

  excluirSolicitacao(id: number): void {
    const confirmar = confirm(
      'Deseja realmente excluir esta solicitação?'
    );

    if (!confirmar) {
      return;
    }

    this.solicitacaoService.excluir(id).subscribe({
      next: () => {
        this.listarSolicitacoes();
      },
      error: (error) => {
        console.error('Erro ao excluir solicitação:', error);
        this.erro = 'Não foi possível excluir a solicitação.';
      }
    });
  }

  editarSolicitacao(solicitacao: Solicitacao): void {
    this.editando = true;
    this.criando = false;
    this.solicitacaoEditandoId = solicitacao.id;

    this.formulario = {
      titulo: solicitacao.titulo,
      descricao: solicitacao.descricao,
      categoria: solicitacao.categoria
    };
  }

  novaSolicitacao(): void {
    this.criando = true;
    this.editando = false;
    this.solicitacaoEditandoId = null;

    this.formulario = {
      titulo: '',
      descricao: '',
      categoria: ''
    };
  }

  cancelarEdicao(): void {
    this.editando = false;
    this.criando = false;
    this.solicitacaoEditandoId = null;

    this.formulario = {
      titulo: '',
      descricao: '',
      categoria: ''
    };
  }

  salvarEdicao(): void {
    if (this.solicitacaoEditandoId === null) {
      return;
    }

    const dados = {
      titulo: this.formulario.titulo,
      descricao: this.formulario.descricao,
      categoria: this.formulario.categoria,
      solicitanteId: 1
    };

    this.solicitacaoService.editar(
      this.solicitacaoEditandoId,
      dados
    ).subscribe({
      next: () => {
        this.cancelarEdicao();
        this.listarSolicitacoes();
      },
      error: (error) => {
        console.error('Erro ao editar solicitação:', error);
        this.erro = 'Não foi possível editar a solicitação.';
      }
    });
  }

  salvarNovaSolicitacao(): void {
    const dados = {
      titulo: this.formulario.titulo,
      descricao: this.formulario.descricao,
      categoria: this.formulario.categoria,
      solicitanteId: 1
    };

    this.solicitacaoService.criar(dados).subscribe({
      next: () => {
        this.cancelarEdicao();
        this.listarSolicitacoes();
      },
      error: (error) => {
        console.error('Erro ao criar solicitação:', error);
        this.erro = 'Não foi possível criar a solicitação.';
      }
    });
  }

  alterarStatus(id: number, status: string): void {
    this.solicitacaoService.atualizarStatus(id, status).subscribe({
      next: () => {
        this.listarSolicitacoes();
      },
      error: (error) => {
        console.error('Erro ao atualizar status:', error);
        this.erro = 'Não foi possível atualizar o status.';
      }
    });
  }
}
