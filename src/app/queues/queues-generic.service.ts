import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Queues } from './queues';
import { CrudService } from '../shared/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueuesGenericService extends CrudService<Queues> {

  constructor(protected http: HttpClient) {

    super(http, `${environment.API}filas`);

  }
}
