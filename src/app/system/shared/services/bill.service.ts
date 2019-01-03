import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { map, take } from 'rxjs/operators';
import { BaseApi } from 'src/app/shared/core/base-api';

@Injectable()
export class BillService extends BaseApi{
    constructor(public http:Http){
        super(http);
    }
    // getBill(): Observable<Bill>{
    //     return this.http.get('http://localhost:3000/bill').pipe(map((response:Response)=>response.json()));
    // }
    getBill(): Observable<Bill>{
      return this.get('bill');
    }
    getCurrency(base:string='RUB'):Observable<any>{
     // tslint:disable-next-line:max-line-length
     return this.http.get(`http://data.fixer.io/api/latest?access_key=9a28cb3bfa565dda81630af7713e0783&base = ${base}&symbols=EUR,USD,RUB`).pipe(map((response:Response)=>response.json()));
    }
    updateBill(bill:Bill):Observable<Bill>{
        return this.put('bill',bill);
    }
}