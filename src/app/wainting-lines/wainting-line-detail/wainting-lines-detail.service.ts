import { WaintingLinesDetail } from './wainting-lines-detail';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WaintingLinesDetailService {
  // private readonly API = 'http://localhost:3000/wainting-lines';
  private readonly API = `${environment.API}/waiting_lines_id`;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  listWaintingLines() {
    return this.http
      .get<WaintingLinesDetail[]>(this.API, {withCredentials: true})
      .pipe(delay(2000), tap(console.log));
    }

  loadById(id) {
    return this.http.get<WaintingLinesDetail>(`${this.API}/${id}`).pipe(take(1));
  }






  }


