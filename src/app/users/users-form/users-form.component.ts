import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from './../../shared/alert-modal.service';
import { UsersService } from '../users.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
  preserveWhitespaces: true,
})
export class UsersFormComponent implements OnInit {
  formUser: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // this.route.params.subscribe((params: any) => {
    //   const id = params['id'];
    //   console.log(id);
    //   const user$ = this.usersService.loadById(id);
    //   user$.subscribe(user => {
    //     this.updateForm(user);
    //   });
    // });
    // this.route.params
    // .pipe(
    //   map((params: any) => params.id),
    //   switchMap(id => this.usersService.loadById(id))
    // )
    // // tslint:disable-next-line: no-shadowed-variable
    // .subscribe(user => this.updateForm(user));

    // const user = this.route.snapshot.data.user;

    this.formUser = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required],
      phone_number:  ['', Validators.required],
      role_id: ['', Validators.required],
    });
    // this.formUser = this.formBuilder.group({
    //   username: [
    //     user.username,
    //     [
    //       Validators.required,
    //       Validators.minLength(4),
    //       Validators.maxLength(20),
    //     ],
    //   ],
    //   password: [
    //     user.password,
    //     [
    //       Validators.required,
    //       Validators.minLength(6),
    //       Validators.maxLength(20),
    //     ],
    //   ],
    //   phone_number: [
    //     user.phone_number,
    //     [
    //       Validators.required,
    //       Validators.minLength(8),
    //       Validators.maxLength(20),
    //     ],
    //   ],
    //   email: [
    //     user.email,
    //     [
    //       Validators.required,
    //       Validators.minLength(8),
    //       Validators.maxLength(20),
    //     ],
    //   ],
    //   status: [
    //     user.status,
    //     [
    //       Validators.required,
    //       Validators.minLength(8),
    //       Validators.maxLength(20),
    //     ],
    //   ],
    //   role_id: [
    //     user.role_id,
    //     [
    //       Validators.required,
    //       Validators.minLength(1),
    //       Validators.maxLength(20),
    //     ],
    //   ]
    // });
  }

  // tslint:disable-next-line: typedef
  // updateForm(user) {
  //   this.formUser.patchValue({
  //     id: user.id,
  //     cargo: user.cargo,
  //     username: user.username,
  //     senha: user.senha,
  //     admin: user.admin,
  //     status: user.status,
  //   });
  // }

  // tslint:disable-next-line: typedef
  hasError(field: string) {
    return this.formUser.get(field).errors;
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    console.log(this.formUser.value);
    if (this.formUser.valid) {
      console.log('submit');

      // tslint:disable-next-line: prefer-const
      let msgSuccess = 'Usuário cadastrado com sucesso!';
      // tslint:disable-next-line: prefer-const
      let msgError = 'Erro ao cadastrar usuário. Tente novamente!';

      if (this.formUser.value.id) {
        // tslint:disable-next-line: prefer-const
        msgSuccess = 'Cadastro atualizado com sucesso!';
        // tslint:disable-next-line: prefer-const
        msgError = 'Erro ao atualizar cadastro. Tente novamente!';
      }

      this.usersService.save(this.formUser.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        (error) => this.modal.showAlertDanger(msgError)
      );

      /*
      if (this.form.value.id) {
        // update
        this.service.updateQueues(this.form.value).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Fila atualizada com sucesso');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger(
              'Erro ao atualizar uma lista. Tente novamente'
            ),
          () => console.log('update completo')
        );
      } else {
        this.service.createQueues(this.form.value).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Fila cadastrada com sucesso');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger(
              'Erro ao criar uma nova lista. Tente novamente'
            ),
          () => console.log('request completo')
        );
      } */
    }
  }

  // tslint:disable-next-line: typedef
  onCancel() {
    this.submitted = false;
    this.formUser.reset();
    this.location.back();
    console.log('cancel');
  }
}
