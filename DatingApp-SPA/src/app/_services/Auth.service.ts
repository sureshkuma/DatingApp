import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
jwthelper = new JwtHelperService();
decodetoken: any;
baseurl = environment.apiurl;
currentuser: User;
Photourl = new BehaviorSubject<string>('../../assets/user.png');
currenetphotourl = this.Photourl.asObservable();

ChangeMemberPhoto(photurl: string) {
this.Photourl.next(photurl);
}

constructor(private http: HttpClient) { }
Login(user1: User) {
  return this.http.post(this.baseurl + 'auth/login', user1).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodetoken = this.jwthelper.decodeToken(user.token);
        this.currentuser = user.user;
       this.ChangeMemberPhoto(this.currentuser.photoUrl);
      }
    })
  );

}

register(user: User) {
return this.http.post(this.baseurl + 'auth/register', user);
}

Loggedinn() {
  const token = localStorage.getItem('token');
 return !this.jwthelper.isTokenExpired(token);
}
}
