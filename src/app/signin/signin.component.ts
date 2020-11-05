import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password = new FormControl('', [Validators.required]);

  hide = true;

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Insira um email';
    }
    return this.email.hasError('email') ? 'Email inválido' : '';
  }

}
