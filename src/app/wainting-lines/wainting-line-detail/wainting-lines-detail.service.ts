import { WaintingLinesDetail, NextCustomer } from './wainting-lines-detail';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, take } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Customer } from '../wainting-line-forms/Customer';
import { Observable } from 'rxjs';

interface CustomerResponse {
  data: Customer;
}

@Injectable({
  providedIn: 'root',
})
export class WaintingLinesDetailService {

  private readonly API = `${environment.API}/line-ups?waiting_line_id=`;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  listWaintingLines(id): Observable<WaintingLinesDetail> {
    return this.http
      .get<WaintingLinesDetail>(this.API+id, {withCredentials: true});
    }

  // loadById(id) {
  //   return this.http.get<WaintingLinesDetail>(`${this.API}/${id}`).pipe(take(1));
  // }

  nextCustomer(id: number) {
    return this.http.get('http://www.tuamesa.com.br:8080/api/line-ups/next-customer?waiting_line_id='+id, { withCredentials: true})
                          .toPromise();

  }
  callNextCustomer (id) {
  return this.nextCustomer(id)
    .then( (data: NextCustomer) => {
      const { id }  = data.data;
      const user = this.http.put(`http://www.tuamesa.com.br:8080/api/line-ups/${id}/call-customer`,
                                {},
                                {withCredentials: true})
                                .toPromise();
      user.then((data) => { console.log('Call to customer completed !' + JSON.stringify(data)); });
    });
  }

  create(client) {
    return this.http
      .post(this.API,
        {
          custmoter_name: client.custmoter_name,
          customer_phone_number: client.customer_phone_number
        },
        { withCredentials: true })
      .pipe(take(1));
  }

  update(client) {
    return this.http.put(`${this.API}/${client.id}`, client).pipe(take(1));
  }

  getCustomer(data: Customer) {

    console.log(data);

    let { name, phone_number, email, description } = data;
    if (!email) {
      email = '';
    }
    if (!description) {
      description = '';
    }

    return this.http.post(`http://www.tuamesa.com.br:8080/api/customers`, {
      name,
      phone_number,
      email,
      description
    }, { withCredentials: true})
    .toPromise();
  }

  save(client: Customer, waitingLineId: string) {
    return this.getCustomer(client)
    .then((data: CustomerResponse) => {
      const { id } = data.data;
      const user = this.http.post('http://www.tuamesa.com.br:8080/api/line-ups', {
        waiting_line_id: waitingLineId,
        customer_id: id
        }, {withCredentials: true}).toPromise();
      user
      .then((data) => { console.log('User Added to Line !' + JSON.stringify(data)); return data; })
      .catch( (error) => {
        console.log(JSON.stringify(error));
      });
    })
    .catch( error => {
      return error;
    });
  }
  //   if(client.id){
  //     return this.update(client);
  //   } else {
  //     return this.create(client);
  //   }
  // }


}


