import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from './../shared/alert-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from './users.service';
import { Users } from './users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  preserveWhitespaces: true,
})
export class UsersComponent implements OnInit {

  // users: Users[];

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  users$: Observable<Users[]>;
  error$ = new Subject<boolean>();

  userSelected: Users;

  constructor(
    private service: UsersService,
    private modalService: BsModalService,
    private alerteService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // this.service.list().subscribe(dados => this.users = dados);
    this.onRefresh();
  }
  // tslint:disable-next-line: typedef
  onRefresh() {
    this.users$ = this.service.listUsers()
      .pipe(
        // .map()
        // .tap()
        // .switchMap()
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          // tslint:disable-next-line: deprecation
          return empty();
        })
      );

    this.service.listUsers()
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

  // tslint:disable-next-line: typedef
  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  // tslint:disable-next-line: typedef
  onDelet(id) {
    this.userSelected = id;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'class-sm',
    });
  }

  onConfirmDelete() {
    this.service.remove(this.userSelected.id).subscribe(
      (success) => {
        this.onRefresh();
        this.onDeclineDelete();
      },
      (error) => {
        this.alerteService.showAlertDanger(
          'Erro ao excluir usuário. Atualize e tente novamente.'
        ),
        this.onDeclineDelete();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide()
  }


}
