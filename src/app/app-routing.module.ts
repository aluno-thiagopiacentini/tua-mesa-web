import { QueueFormComponent } from './queue-form/queue-form.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueuesComponent } from './queues/queues.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'filas', component: QueuesComponent },
  { path: 'filas/nova', component: QueueFormComponent },
  { path: 'editar/:id', component: QueueFormComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'cadastro', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
