import { Queues } from './queues';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, take, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QueuesService {
  private readonly API = `${environment.API}filas`;
  // private readonly API = `${environment.API}/waiting-lines`;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  listQueues() {
    return this.http
      .get<Queues[]>(this.API,
        {withCredentials: true}
        )
      .pipe(delay(1000), tap(console.log));
  }

  // tslint:disable-next-line: typedef
  loadById(id) {
    return this.http.get<Queues>(`${this.API}/${id}`).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  private createQueues(queue) {
    return this.http.post(this.API, queue).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  private updateQueues(queue) {
    return this.http.put(`${this.API}/${queue.id}`, queue).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  save(queue) {
    if (queue.id) {
      return this.updateQueues(queue);
    }
    return this.createQueues(queue);
  }

  // tslint:disable-next-line: typedef
  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
