import { Http, Response } from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map, take } from 'rxjs/operators';
import { BaseApi } from '../core/base-api';

// tslint:disable-next-line:eofline
@Injectable()

export class UserService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }
    // getUserByEmail(email: string): Observable<User> {
    //     return this.http.get(`http://localhost:3000/users?email=${email}`).pipe(map((response: Response) => response.json()))
    //                                                                       .pipe(map((user: User[]) => user[0] ? user[0] : undefined));
    // }
    getUserByEmail(email: string): Observable<User> {
        return this.get(`users?email=${email}`).pipe(map((users:User[])=>users[0]?users[0]:undefined));
    }
    // createNewUser(user:User) : Observable<User>{
    //     return this.http.post('http://localhost:3000/users',user).pipe(map((response: Response) => response.json()));
    // }
    createNewUser(user:User) : Observable<User>{
      return this.post('users',user);
    }
}
