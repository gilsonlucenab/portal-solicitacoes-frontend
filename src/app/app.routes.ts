import { Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { SolicitacoesComponent } from './pages/solicitacoes/solicitacoes.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'solicitacoes',
    component: SolicitacoesComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
