import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
jwthelper = new JwtHelperService();
decodetoken: any;
  baseUrl = 'http://localhost:5000/api/auth/';

constructor(private http: HttpClient) { }
Login(model: any) {
  return this.http.post('http://localhost:5000/api/auth/login', model).pipe(
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
return this.http.post(this.baseUrl + 'register', model);
}

Loggedinn() {
  const token = localStorage.getItem('token');
 return !this.jwthelper.isTokenExpired(token);
}
}
