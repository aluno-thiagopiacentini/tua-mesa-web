import { Queues } from './queues';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, take, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueuesService {

  private readonly API = `${environment.API}filas`;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  listQueues(){
    return this.http.get<Queues[]>(this.API)
    .pipe(
      delay(1000),
      tap(console.log)
    );
  }

  // tslint:disable-next-line: typedef
  creatQueues(queue){
    return this.http.post(this.API, queue).pipe(take(1));
  }

}
