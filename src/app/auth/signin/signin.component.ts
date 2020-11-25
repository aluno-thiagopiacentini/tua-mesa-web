import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  ishttpLoaded = false;
  isLoaded = false;
  logged = false;

  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.ngOnRefresh();
  }
  ngOnRefresh(): void {
    this.authService.isLogged().subscribe(data => {
      this.logged = true;
    }, (error) => {
      this.logged = false;
    });
  }

  onSubmit() {
    this.isLoaded = true;
    this.authService.signIn(
      this.signInForm.value
    ).subscribe(
      (response) => {
        this.isLoaded = false;
        this.logged = true;
        this.route.navigate(['espera']);
      }
      ,
      (error) => {
        this.isLoaded = false;
        this.logged = false;
        this.signInForm.get('password').reset();
      }
    );
  }
}
