import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { CrudService } from './../shared/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersGenericService extends CrudService<Users> {

  constructor(protected http: HttpClient) {

    super(http, `${environment.API}users`);

  }
}
