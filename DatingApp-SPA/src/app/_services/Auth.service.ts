import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
jwthelper = new JwtHelperService();
decodetoken: any;
baseurl = environment.apiurl;

constructor(private http: HttpClient) { }
Login(model: any) {
  return this.http.post(this.baseurl + 'auth/login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodetoken = this.jwthelper.decodeToken(user.token);
      }
    })
  );

}

register(model: any) {
return this.http.post(this.baseurl + 'register', model);
}

Loggedinn() {
  const token = localStorage.getItem('token');
 return !this.jwthelper.isTokenExpired(token);
}
}
