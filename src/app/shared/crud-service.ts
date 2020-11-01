import { delay, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export class CrudService<T> {

  constructor(protected http: HttpClient, private API_URL) {}

  // tslint:disable-next-line: typedef
  listQueues() {
    return this.http
      .get<T[]>(this.API_URL, { withCredentials: true })
      .pipe(delay(1000), tap(console.log));
  }

  // tslint:disable-next-line: typedef
  loadById(id) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  private create(record: T) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  private update(record: T) {
    return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  save(record: T) {
    if (record['id']) {
      return this.update(record);
    }
    return this.create(record);
  }

  // tslint:disable-next-line: typedef
  remove(id) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
