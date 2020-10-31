import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Users } from './users';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly API = `${environment.API}users`;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  listUsers() {
    return this.http
      .get<Users[]>(this.API, { withCredentials: false })
      .pipe(delay(1000), tap(console.log));
  }

  // tslint:disable-next-line: typedef
  loadById(id) {
    return this.http.get<Users>(`${this.API}/${id}`).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  private createUsers(user) {
    return this.http.post(this.API, user).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  private updateUsers(user) {
    return this.http.put(`${this.API}/${user?.id}`, user).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  save(user) {
    if (user.id) {
      return this.updateUsers(user);
    }
    return this.createUsers(user);
  }

  // tslint:disable-next-line: typedef
  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
