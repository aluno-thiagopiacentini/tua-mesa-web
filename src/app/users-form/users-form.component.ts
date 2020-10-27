import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertModalService } from './../shared/alert-modal.service';
import { UsersService } from './../users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    private service: UsersService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const user = this.route.snapshot.data.user;

    this.formUser = this.formBuilder.group(
      {
        id: [user.id],
        nome: [user.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(20), ], ],
        usuario: [user.usuario, [Validators.required, Validators.minLength(4), Validators.maxLength(20), ], ],
        senha: [user.senha, [Validators.required, Validators.minLength(4), Validators.maxLength(20), ], ],
        admin: [user.admin, [Validators.required, Validators.minLength(4), Validators.maxLength(20), ], ],
        ativo: [user.ativo, [Validators.required, Validators.minLength(4), Validators.maxLength(20), ], ],
      }
    );
  }

    // tslint:disable-next-line: typedef
    updateForm(user) {
      this.formUser.patchValue({
        id: user.id,
        nome: user.nome,
        usuario: user.usuario,
        senha: user.senha,
        admin: user.admin,
        ativo: user.ativo,
      });
    }

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
      let msgSuccess = 'Fila criada com sucesso!';
      // tslint:disable-next-line: prefer-const
      let msgError = 'Erro ao criar fila. Tente novamente!';

      if (this.formUser.value.id) {
        // tslint:disable-next-line: prefer-const
        msgSuccess = 'Fila atualizada com sucesso!';
        // tslint:disable-next-line: prefer-const
        msgError = 'Erro ao atualizar fila. Tente novamente!';
      }

      this.service.save(this.formUser.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        (error) =>
          this.modal.showAlertDanger(msgError)
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
