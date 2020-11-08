import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EMPTY, empty, Observable, Subject } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { AlertModalService } from '../shared/alert-modal.service';
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
  // bsModalRef: BsModalRef;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  users$: Observable<Users[]>;
  error$ = new Subject<boolean>();

  userSelected: Users;

  constructor(
    private service: UsersService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.onRefresh();
  }
  // tslint:disable-next-line: typedef
  onRefresh() {
    this.users$ = this.service.listUsers().pipe(
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
    //   .listUsers()
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
    this.alertService.showAlertDanger('Erro ao carregar a lista de usuário');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar a fila de clientes';
  }

  // tslint:disable-next-line: typedef
  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  // tslint:disable-next-line: typedef
  onDelete(id) {
    this.userSelected = id;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'class-sm'});

    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja excluir o usuário?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.service.remove(this.userSelected.id) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.onRefresh();
          // this.onDeclineDelete();
        },
        (error) => {
          this.alertService.showAlertDanger('Erro ao excluir usuário. Atualize e tente novamente.');
            // this.onDeclineDelete();
        }
      );
  }

  // tslint:disable-next-line: typedef
  onConfirmDelete() {
    this.service.remove(this.userSelected.id).subscribe();
  }

  // tslint:disable-next-line: typedef
  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
