import { UsersResolverGuard } from './guards/users.resolver.guard';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueuesComponent } from './queues/queues.component';
import { QueuesResolverGuard } from './guards/queues.resolver.guard';
import { QueuesFormComponent } from './queues/queues-form/queues-form.component';
import { UsersFormComponent } from './users/users-form/users-form.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
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
    component: RegisterComponent,
    //  canActivate: [AuthGuard],
  },
  {
    path: 'users/new',
    component: UsersFormComponent,
    resolve: {
      queue: QueuesResolverGuard,
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'filas/new',
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
      queue: UsersResolverGuard,
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
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
