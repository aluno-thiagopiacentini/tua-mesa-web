import { Injectable } from '@angular/core';
import { WaintingLine } from './../../wainting-lines/wainting-line';
import { WaintingLinesService } from './../../wainting-lines/wainting-lines.service';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WaintingLineResolverGuard implements Resolve<WaintingLine> {
  constructor(private service: WaintingLinesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<WaintingLine> {
    if (route.params && route.params.id) {
      return this.service.loadById(route.params.id);
    }
    return of({
      id: null,
      name: null,
      company_id: null,
      status: null,
      is_priority: null,
      created_at: null,
      updated_at: null,
      qty_total: null,
      max_waiting_minutes: null,
    });
  }
}
