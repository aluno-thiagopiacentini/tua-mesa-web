import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  email = new FormControl('', [Validators.required, Validators.email]);

  hide = true;

  // tslint:disable-next-line: typedef
  getErrorMessage(){
    if (this.email.hasError('required')) {
      return 'Insira um email';
    }
    return this.email.hasError('email') ? 'Email inválido' : '';
  }

  ngOnInit(): void {
  }

}
