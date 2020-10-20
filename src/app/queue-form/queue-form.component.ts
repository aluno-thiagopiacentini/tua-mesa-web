import { AlertModalService } from './../shared/alert-modal.service';
import { QueuesService } from './../queues/queues.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

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
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      priority: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      status: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
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
      this.service.creatQueues(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Fila cadastrada com sucesso');
          this.location.back();
        },
        error => this.modal.showAlertDanger('Erro ao criar uma nova lista. Tente novamente'),
        () => console.log('request completo')
      );
    }
  }

  // tslint:disable-next-line: typedef
  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('cancel');
  }
}
