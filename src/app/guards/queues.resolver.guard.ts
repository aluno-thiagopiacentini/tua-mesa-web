import { QueuesService } from '../queues/queues.service';
import { Queues } from '../queues/queues';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueuesResolverGuard implements Resolve<Queues> {
  constructor(private service: QueuesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Queues> {
    if (route.params && route.params.id) {
      return this.service.loadById(route.params.id);
    }
    return of({
      id: null,
      name: null,
      status: null,
      is_priority: null,
      created_at: null,
      updated_at: null,
    });
  }
}
