import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QueuesService } from '../queues.service';
import { AlertModalService } from '../../shared/alert-modal.service';

import { partitionArray } from '@angular/compiler/src/util';
import { map, switchMap } from 'rxjs/operators';
import { QueuesGenericService } from '../queues-generic.service';

@Component({
  selector: 'app-queues-form',
  templateUrl: './queues-form.component.html',
  styleUrls: ['./queues-form.component.scss'],
  preserveWhitespaces: true,
})
export class QueuesFormComponent implements OnInit {
  formQueue: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: QueuesService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

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

    this.formQueue = this.formBuilder.group({
      name: [
        queue.name,
        [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(255),
        ],
      ],
      is_priority: [
        queue.is_priority,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(5)
        ]
      ]
    });
  }

  // tslint:disable-next-line: typedef
  // updateForm(queue) {
  //   this.formQueue.patchValue({
  //     id: queue.id,
  //     name: queue.name,
  //     is_priority: queue.is_priority,
  //     status: queue.status,
  //   });
  // }

  // tslint:disable-next-line: typedef
  hasError(field: string) {
    return this.formQueue.get(field).errors;
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    console.log(this.formQueue.value);
    if (this.formQueue.valid) {
      console.log('submit');

      // tslint:disable-next-line: prefer-const
      let msgSuccess = 'Fila criada com sucesso!';
      // tslint:disable-next-line: prefer-const
      let msgError = 'Erro ao criar fila. Tente novamente!';

      if (this.formQueue.value.id) {
        // tslint:disable-next-line: prefer-const
        msgSuccess = 'Fila atualizada com sucesso!';
        // tslint:disable-next-line: prefer-const
        msgError = 'Erro ao atualizar fila. Tente novamente!';
      }

      this.service.save(this.formQueue.value).subscribe(
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
    this.formQueue.reset();
    this.location.back();
    // console.log('cancel');
  }
}
