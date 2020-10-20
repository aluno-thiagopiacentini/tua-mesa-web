import { UsersService } from './users.service';
import { empty, Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Users } from './users';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  preserveWhitespaces: true,
})
export class UsersComponent implements OnInit {

  // users: Users[];

  users$: Observable<Users[]>;
  error$ = new Subject<boolean>();

  constructor(private service: UsersService) { }

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

}
