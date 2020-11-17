import { WaintingLineFormsComponent } from './wainting-lines/wainting-line-forms/wainting-line-forms/wainting-line-forms.component';

import { WaintingLineDetailComponent } from './wainting-lines/wainting-line-detail/wainting-line-detail.component';
import { WaintingLinesComponent } from './wainting-lines/wainting-lines.component';
// import { UsersComponent } from './users/users.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueuesComponent } from './queues/queues.component';
import { QueuesFormComponent } from './queues/queues-form/queues-form.component';
// import { UsersFormComponent } from './users/users-form/users-form.component';
// import { UsersResolverGuard } from './auth/guards/users.resolver.guard';
import { QueuesResolverGuard } from './auth/guards/queues.resolver.guard';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: SigninComponent },
  {
    path: 'filas',
    component: QueuesComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'users',
  //   component: UsersComponent,
  //   // canActivate: [AuthGuard],
  // },
  {
    path: 'cadastro',
    component: SignupComponent,
    //  canActivate: [AuthGuard],
  },
  {
    path: 'espera',
    component: WaintingLinesComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'nova-espera',
    // component: WaintingLineDetailComponent,
    component: WaintingLineFormsComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'nova-espera/:id',
    // component: WaintingLineDetailComponent,
    component: WaintingLineFormsComponent,
     canActivate: [AuthGuard],
  },
  // {
  //   path: 'users/novo-usuario',
  //   component: UsersFormComponent,
  //   // resolve: {
  //   //   user: UsersResolverGuard,
  //   // },
  //   // canActivate: [AuthGuard],
  // },
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
