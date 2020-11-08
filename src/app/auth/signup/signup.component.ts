import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formSignUp: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
  ) {
    this.formSignUp = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone_number:  ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.SignUp(
      this.formSignUp.value
     ).then ((data) => {
      this.route.navigate(['filas']);
     });
  }
}
