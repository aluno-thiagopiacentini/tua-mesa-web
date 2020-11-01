import { Injectable } from '@angular/core';
import { UsersService } from './../users/users.service';
import { Users } from '../users/users';

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersResolverGuard implements Resolve<Users> {
  constructor(private userService: UsersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Users> {
    if (route.params && route.params.id) {
      return this.userService.loadById(route.params.id);
    }

    return of({
      id: null,
      cargo: null,
      username: null,
      senha: null,
      admin: null,
      status: null,
    });
  }
}
