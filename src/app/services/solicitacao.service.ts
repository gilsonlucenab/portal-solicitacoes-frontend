import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Solicitacao {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  status: string;
  dataCriacao: string;
  solicitanteId: number;
  solicitanteNome: string;
}

export interface SolicitacaoRequest {
  titulo: string;
  descricao: string;
  categoria: string;
  solicitanteId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private readonly apiUrl = 'http://localhost:8080/api/solicitacoes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(this.apiUrl);
  }

  criar(dados: SolicitacaoRequest): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(this.apiUrl, dados);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarStatus(id: number, status: string): Observable<Solicitacao> {
    return this.http.put<Solicitacao>(
      `${this.apiUrl}/${id}/status`,
      { status }
    );
  }
}
