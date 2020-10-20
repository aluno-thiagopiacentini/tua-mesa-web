import { AlertModalService } from './../shared/alert-modal.service';
import { QueuesService } from './../queues/queues.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { partitionArray } from '@angular/compiler/src/util';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-queue-form',
  templateUrl: './queue-form.component.html',
  styleUrls: ['./queue-form.component.scss'],
  preserveWhitespaces: true,
})
export class QueueFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: QueuesService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const queue$ = this.service.loadById(id);
    //     queue$.subscribe(queue => {
    //       this.updateForm(queue);
    //     });
    //   }
    // );

    // this.route.params
    // .pipe(
    //   map((params: any) => params.id),
    //   switchMap(id => this.service.loadById(id)),
    //   // switchMap(queues => obterOutros(id))

    // )
    // .subscribe(queue => this.updateForm(queue));

    // concatMap => a ordem da requisição importa
    // mergeMap => ordem não importa
    // exhausMap = casos de login

    const queue = this.route.snapshot.data.queue;

    this.form = this.formBuilder.group({
      id: [queue.id],
      nome: [queue.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(20), ], ],
      priority: [
        queue.priority,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      status: [
        queue.status,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  // tslint:disable-next-line: typedef
  updateForm(queue) {
    this.form.patchValue({
      id: queue.id,
      nome: queue.nome,
      priority: queue.priority,
      status: queue.status,
    });
  }

  // tslint:disable-next-line: typedef
  hasError(field: string) {
    return this.form.get(field).errors;
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      // tslint:disable-next-line: prefer-const
      let msgSuccess = 'Fila criada com sucesso!';
      // tslint:disable-next-line: prefer-const
      let msgError = 'Erro ao criar fila. Tente novamente!';

      if (this.form.value.id) {
        // tslint:disable-next-line: prefer-const
        msgSuccess = 'Fila atualizada com sucesso!';
        // tslint:disable-next-line: prefer-const
        msgError = 'Erro ao atualizar fila. Tente novamente!';
      }

      this.service.save(this.form.value).subscribe(
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
    this.form.reset();
    this.location.back();
    // console.log('cancel');
  }
}
