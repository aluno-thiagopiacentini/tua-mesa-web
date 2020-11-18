import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from './../../environments/environment';

interface Position {
  position: number;
  company_name: string;

}

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
      .get<Position>(this.API+token, {withCredentials: true})
      .pipe(delay(2000), tap(console.log));
    }
}


