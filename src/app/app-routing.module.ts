import { AuthGuard } from './auth/guards/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

import { QueuesComponent } from './queues/queues.component';
import { QueuesFormComponent } from './queues/queues-form/queues-form.component';
import { QueuesResolverGuard } from './auth/guards/queues.resolver.guard';

import { WaintingLinesComponent } from './wainting-lines/wainting-lines.component';
import { WaintingLineDetailComponent } from './wainting-lines/wainting-line-detail/wainting-line-detail.component';
import { WaintingLineFormsComponent } from './wainting-lines/wainting-line-forms/wainting-line-forms/wainting-line-forms.component';
import { WaintingLineResolverGuard } from './auth/guards/wainting-lines.resolver.guard';

import { StatusPositionComponent } from './status-position/status-position.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SigninComponent },
  {
    path: 'filas',
    component: QueuesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro',
    component: SignupComponent,
  },
  {
    path: 'espera',
    component: WaintingLinesComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'status/:token',
    component: StatusPositionComponent
  },
  {
    path: 'nova-espera',
    component: WaintingLineFormsComponent,
     canActivate: [AuthGuard],
     resolve: {
      novaEspera: WaintingLineResolverGuard,
    }
  },
  {
    path: 'nova-espera/:id',
    component: WaintingLineFormsComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'filas/nova-fila',
    component: QueuesFormComponent,
    resolve: {
      queue: QueuesResolverGuard,
    },
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'users/editar/:id',
  //   component: UsersFormComponent,
  //   // resolve: {
  //   //   user: UsersResolverGuard,
  //   // },
  //   // canActivate: [AuthGuard],
  // },
  {
    path: 'filas/editar/:id',
    component: QueuesFormComponent,
    resolve: {
      queue: QueuesResolverGuard,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'detalhes/:id',
    component: WaintingLineDetailComponent,
     canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
