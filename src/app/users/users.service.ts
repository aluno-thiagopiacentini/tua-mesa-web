import { Users } from './users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = `${environment.API}users`;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  listUsers() {
    return this.http.get<Users[]>(this.API)
    .pipe(
      delay(1000),
      tap(console.log)
    );
  }
}
