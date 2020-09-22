import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
