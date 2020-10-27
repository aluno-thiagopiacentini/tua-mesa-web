import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiClient } from '../shared/http-common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  fazerLogin() {
    this.authService.fazerLogin(this.usuario);
  }
  // private apiClient: ApiClient;

  // constructor(apiClient: ApiClient) {
  //   this.apiClient = apiClient;
  // }

  // email = new FormControl('', [Validators.required, Validators.email]);
  // username = new FormControl('', [Validators.required]);
  // password = new FormControl('', [Validators.required]);
  // form01: FormGroup;

  // hide = true;

  // // tslint:disable-next-line: typedef
  // getErrorMessage(){
  //   if (this.email.hasError('required')) {
  //     return 'Insira um email';
  //   }
  //   return this.email.hasError('email') ? 'Email inválido' : '';
  // }

  // ngOnInit(): void {
  //   this.form01 = new FormGroup({
  //     email: new FormControl()
  //  });

  // }

  // async doLogin(): Promise<void> {

  //   await this.apiClient.post({
  //     url: '/api/users/login',
  //     data: {
  //       email: this.email.value
  //     },
  //     headers: {
  //       'Content-type': 'application/json',
  //       'X-Requested-With': 'XMLHttpRequest'
  //     },
  //     auth: {
  //       username: this.username.value,
  //       password: this.password.value
  //   }
  //   });
  // }
}
