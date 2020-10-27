import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAutenticado = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  // tslint:disable-next-line: typedef
  fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'email@email.com' && usuario.senha === '123456') {
      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);
    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }
  }

  // tslint:disable-next-line: typedef
  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
