// import { Injectable } from '@angular/core';
// import { Users } from '../../users/users';
// import { UsersService } from './../../users/users.service';

// import {
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Resolve,
// } from '@angular/router';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class UsersResolverGuard implements Resolve<Users> {
//   constructor(private userService: UsersService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<Users> {
//     if (route.params && route.params.id) {
//       return this.userService.loadById(route.params.id);
//     }

//     return of({
//       id: null,
//       email: null,
//       username: null,
//       password: null,
//       role_id: null,
//       status: null,
//       phone_number: null
//     });

//   }
// }
