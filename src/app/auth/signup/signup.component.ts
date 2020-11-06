import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignUp: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
