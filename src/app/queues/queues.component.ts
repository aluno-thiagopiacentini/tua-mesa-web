import { AlertModalService } from '../shared/alert-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { Queues } from './queues';
import { QueuesService } from './queues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QueuesGenericService } from './queues-generic.service';
import { TransformBoolean } from '../shared/transform/transform-boolean';

@Component({
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.scss'],
  preserveWhitespaces: true,
})
export class QueuesComponent implements OnInit {
  ishttpLoaded = false;
  isLoaded = false;

  queues: Queues[];
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

  onRefresh(): void {
    this.isLoaded = true;
    this.service.listQueues().subscribe(data => {
      console.log('Queues: ' + JSON.stringify(data.data));
      this.queues = data.data;
      this.isLoaded = false;
    });
  }

  handleError(): void {
    this.alertService.showAlertDanger('Erro ao carregar a fila de usuários');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar a fila de clientes';
  }

  onEdit(id: number): void {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  // tslint:disable-next-line: typedef
  onDelete(id) {
    this.queueSelected = id;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'class-sm'});
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja excluir a fila cadastarda?'
    );
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(
        (result) => result ? this.service.remove(this.queueSelected.id) : EMPTY
      )
    )
    .subscribe(
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
  onConfirmDelete() {
    this.service.remove(this.queueSelected.id).subscribe(
    );
  }

  // tslint:disable-next-line: typedef
  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
