import { AlertModalService } from './../shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Queues } from './queues';
import { QueuesService } from './queues.service';
import { AlertModalComponent } from './../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.scss'],
  preserveWhitespaces: true,
})
export class QueuesComponent implements OnInit {

  // queues: Queues[];
  // bsModalRef: BsModalRef;

  queues$: Observable<Queues[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: QueuesService,
    // private modalService: BsModalService,
    private alerteService: AlertModalService,
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // this.service.list().subscribe(dados => this.queues = dados);
    this.onRefresh();
  }

  // tslint:disable-next-line: typedef
  onRefresh() {
    this.queues$ = this.service.listQueues()
      .pipe(
        // .map()
        // .tap()
        // .switchMap()
        catchError(error => {
          console.error(error);
          // this.error$.next(true);
          this.handleError();
          // tslint:disable-next-line: deprecation
          return empty();
        })
      );

    this.service.listQueues()
      .pipe(
        // tslint:disable-next-line: deprecation
        catchError(error => empty())
      )
      .subscribe(
        dados => {
          console.log(dados);
        },
        // error => console.error(error),
        // () => console.log('Observable completo')
      );
  }

  // tslint:disable-next-line: typedef
  handleError() {
    this.alerteService.showAlertDanger('Erro ao carregar a fila de clientes');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar a fila de clientes';
  }

}
