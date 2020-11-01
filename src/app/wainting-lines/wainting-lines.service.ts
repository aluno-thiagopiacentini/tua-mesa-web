import { tap, delay } from 'rxjs/operators';
import { WaintingLine } from './wainting-line';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WaintingLinesService {
  // private readonly API = 'http://localhost:3000/wainting-lines';
  private readonly API = `${environment.API}wainting-lines`;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  listWaintingLines() {
    return this.http.get<WaintingLine[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }
}
