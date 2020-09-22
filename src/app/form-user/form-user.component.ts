import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  constructor() { }

  email = new FormControl('', [Validators.required, Validators.email]);

  hide = true;

  // tslint:disable-next-line: typedef
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Insira um email';
    }
    return this.email.hasError('email') ? 'Email inválido' : '';
  }

  ngOnInit(): void {
  }

}
