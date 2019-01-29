import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs';
import { User } from '../_models/User';



@Injectable({
  providedIn: 'root'
})
export class UserService {
baseurl = environment.apiurl;
constructor(private http: HttpClient) { }

getusers(): Observable<User[]> {

  return this.http.get<User[]>(this.baseurl + 'users');
}

Getuser(id): Observable<User> {

  return this.http.get<User>(this.baseurl + 'users/' + id);
}

Updateuser(id: number, user: User) {
  return this.http.put(this.baseurl + 'users/' + id , user);
}

SetMainPhot(UserId: number, id: number) {

  return this.http.post(this.baseurl + 'users/' + UserId + '/photos/' + id + '/SetMain',  {});
}

DeletePhoto(UserId: number, id: number) {
  return this.http.delete(this.baseurl + 'users/' + UserId + 'photos/' + id);
}
}
