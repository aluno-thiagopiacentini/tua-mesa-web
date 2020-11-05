import { WaintingLineDetailComponent } from './wainting-lines/wainting-line-detail/wainting-line-detail.component';
import { WaintingLinesComponent } from './wainting-lines/wainting-lines.component';
import { UsersResolverGuard } from './guards/users.resolver.guard';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueuesComponent } from './queues/queues.component';
import { QueuesResolverGuard } from './guards/queues.resolver.guard';
import { QueuesFormComponent } from './queues/queues-form/queues-form.component';
import { UsersFormComponent } from './users/users-form/users-form.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  {
    path: 'filas',
    component: QueuesComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'cadastro',
    component: SignupComponent,
    //  canActivate: [AuthGuard],
  },
  {
    path: 'espera',
    component: WaintingLinesComponent,
    //  canActivate: [AuthGuard],
  },
  {
    path: 'detalhes',
    component: WaintingLineDetailComponent,
    //  canActivate: [AuthGuard],
  },
  {
    path: 'users/novo-usuario',
    component: UsersFormComponent,
    resolve: {
      user: UsersResolverGuard,
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'filas/nova-fila',
    component: QueuesFormComponent,
    resolve: {
      queue: QueuesResolverGuard,
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'users/editar/:id',
    component: UsersFormComponent,
    resolve: {
      user: UsersResolverGuard,
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'filas/editar/:id',
    component: QueuesFormComponent,
    resolve: {
      queue: QueuesResolverGuard,
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'detalhes/:id',
    component: WaintingLineDetailComponent,
    //  canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
