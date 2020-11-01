import { AlertModalService } from '../shared/alert-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Queues } from './queues';
import { QueuesService } from './queues.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.scss'],
  preserveWhitespaces: true,
})
export class QueuesComponent implements OnInit {
  // queues: Queues[];
  // bsModalRef: BsModalRef;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  queues$: Observable<Queues[]>;
  error$ = new Subject<boolean>();

  queueSelected: Queues;

  constructor(
    private service: QueuesService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // this.service.list().subscribe(dados => this.queues = dados);
    this.onRefresh();
  }

  // tslint:disable-next-line: typedef
  onRefresh() {
    this.queues$ = this.service.listQueues().pipe(
      // .map()
      // .tap()
      // .switchMap()
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        // tslint:disable-next-line: deprecation
        return empty();
      })
    );

    // this.service
    //   .listQueues()
    //   .pipe(
    //     // tslint:disable-next-line: deprecation
    //     catchError((error) => empty())
    //   )
    //   .subscribe(
    //     (dados) => {
    //       console.log(dados);
    //     }
    //     // error => console.error(error),
    //     // () => console.log('Observable completo')
    //   );
  }

  // tslint:disable-next-line: typedef
  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar a fila de usuários');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar a fila de clientes';
  }

  // tslint:disable-next-line: typedef
  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  // tslint:disable-next-line: typedef
  onDelet(id) {
    this.queueSelected = id;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'class-sm',
    });
  }

  // tslint:disable-next-line: typedef
  onConfirmDelete() {
    this.service.remove(this.queueSelected.id).subscribe(
      (success) => {
        this.onRefresh();
        this.onDeclineDelete();
      },
      (error) => {
        this.alertService.showAlertDanger(
          'Erro ao excluir fila. Atualize e tente novamente'
        ),
          this.onDeclineDelete();
      }
    );
  }

  // tslint:disable-next-line: typedef
  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
