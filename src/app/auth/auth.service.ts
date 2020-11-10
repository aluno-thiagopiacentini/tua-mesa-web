import { Payload } from './interfaces/auth';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { Signin } from './interfaces/signin';
import { Signup } from './interfaces/signup';
import { Auth } from './interfaces/auth';
import { throwError } from 'rxjs';

interface Company {
  id: number;
}
interface CompanyResponse {
  data: Company;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private usuarioAutenticado = false;
  private AUTH_KEY: string = 'auth';
  private TOKEN_KEY: string = 'token';
  private endpoint: string = environment.API + '/users';

  // mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // tslint:disable-next-line: typedef
  // fazerLogin(usuario: Usuario) {
  //   if (usuario.nome === 'email@email.com' && usuario.senha === '123456') {
  //     this.usuarioAutenticado = true;

  //     this.mostrarMenuEmitter.emit(true);

  //     this.router.navigate(['/']);
  //   } else {
  //     this.usuarioAutenticado = false;
  //     this.mostrarMenuEmitter.emit(false);
  //   }
  // }

  // tslint:disable-next-line: typedef
  // usuarioEstaAutenticado() {
  //   return this.usuarioAutenticado;
  // }

  signIn(credential: Signin) {
    return this.http.post(this.endpoint + '/login', { email: credential.email } , {
      headers: {
      'content-type': 'application/json',
      Authorization: 'Basic ' + btoa(credential.username + ':' + credential.password)
      },
      withCredentials: true,
      },
      )
      .pipe(
        map((auth: Auth) => this.setAuth(auth)),
        catchError((response) => throwError(response.error))
      );
  }


  SignUp(request: Signup) {
    return this.createCompany(request)
    .then( (data: CompanyResponse) => {
      const { id }  = data.data;
      console.log('Response Company Created : ' + JSON.stringify(id));
      const user = this.http.post(this.endpoint, {
                              username: request.username,
                              password: request.password,
                              email: request.email,
                              phone_number: request.phone_number,
                              company_id: JSON.stringify(id),
                              role_id: 1
                          }, {withCredentials: true}).toPromise();
      user.then((CustomerData) => { console.log('User Created !' + JSON.stringify(CustomerData)); });
    });
  }

  createCompany(data: Signup) {
    return this.http.post('http://www.tuamesa.com.br:8080/api/companies',
                          { name: data.name , phone_number: data.phone_number} )
                          .toPromise();

  }

  setAuth(auth: Auth) {
    if (!auth) return;
    this.auth = auth.payload;
    this.token = auth.token;
  }
  set auth(payload: Payload) {
    window.localStorage.setItem(
      this.AUTH_KEY,
      JSON.stringify(payload)
    );
  }
  get auth(){
    return JSON.parse(
      window.localStorage.getItem(this.AUTH_KEY)
    );
  }
  set token(token: string){
    window.localStorage.setItem(
      this.TOKEN_KEY,
      token
    );
  }
  get token(){
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  signOut() {
    window.localStorage.removeItem(this.AUTH_KEY);
    window.localStorage.removeItem(this.TOKEN_KEY);
  }




}
