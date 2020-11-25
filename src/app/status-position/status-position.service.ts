import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { CustomerPosition } from './CustomerPosition';

@Injectable({
  providedIn: 'root',
})
export class StatusPositionService {
  // private readonly API = 'http://localhost:3000/wainting-lines';
  private readonly API = `${environment.API}/waiting-lines/position?token=`;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  listPosition(token) {
    return this.http
      .get<CustomerPosition[]>(this.API + token, {withCredentials: true})
      .pipe(tap(console.log));
    }

  // tslint:disable-next-line: typedef
  exitLine(token) {
    return this.http
      .put(this.API + token, {}, { withCredentials: true})
      .pipe(tap(console.log));
  }
}


