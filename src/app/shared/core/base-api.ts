import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class BaseApi{
    private baseUrl='http://localhost:3000/';
    constructor(public http:Http){}

    private getUrl(url:string='') : string{
        return this.baseUrl+url;
    }
    public get (url:string=''):Observable<any>{
        return this.http.get(this.getUrl(url)).pipe(map((respons:Response)=>respons.json()));
    }
    public post (url:string='',data:any={}):Observable<any>{
        return this.http.post(this.getUrl(url),data).pipe(map((respons:Response)=>respons.json()));
    }
    public put (url:string='',data:any={}):Observable<any>{
        return this.http.put(this.getUrl(url),data).pipe(map((respons:Response)=>respons.json()));
    }
}