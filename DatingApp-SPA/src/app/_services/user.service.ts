import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Message } from '../../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { Messages } from '../_models/Messages';



@Injectable({
  providedIn: 'root'
})
export class UserService {
baseurl = environment.apiurl;
constructor(private http: HttpClient) { }

getusers(page?, itemsPerPage?, userParams?, likeparams?): Observable<PaginatedResult<User[]>> {
const paginatedresult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
let params = new HttpParams();
if (page != null && itemsPerPage != null) {
 params = params.append('PageNumber', page);
 params = params.append('MyProperty', itemsPerPage);
}

if (userParams != null) {
params = params.append('minAge', userParams.minAge);
params = params.append('maxAge', userParams.maxAge);
params = params.append('gender', userParams.gender);
params = params.append('orderBy', userParams.orderBy);
}
if (likeparams === 'Likers') {
params = params.append('Likers', 'true');
}
if (likeparams === 'Likees') {
  params = params.append('Likees', 'true');
}
  return this.http.get<User[]>(this.baseurl + 'users', { observe: 'response', params: params})
        .pipe(
          map((response: any ) => {
            paginatedresult.Result = response.body;
            if (response.headers.get('Pagination') != null) {
              paginatedresult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedresult;
          })
        );
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

sendLike(UserId: number, recipientId: number) {
return this.http.post(this.baseurl + 'users/' + UserId + '/like/' + recipientId, {});
}

getMessages(UserId: number, page?, itemsPerPage?, MessageContainer?) {
const paginatedresult1: PaginatedResult<Messages[]> = new PaginatedResult<Messages[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null && MessageContainer != null) {
    params = params.append('PageNumber', page);
    params = params.append('MyProperty', itemsPerPage);
   params = params.append('MessageContainer', MessageContainer);
   }

   console.log(params);

   return this.http.get<Messages[]>(this.baseurl + 'users/' + UserId + '/messages', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedresult1.Result = response.body;
          if (response.headers.get('Pagination') != null)  {
            paginatedresult1.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedresult1;
        })
      );
}

getmessagethread(UserId: number, recipientId: number ) {

  return this.http.get(this.baseurl + 'users/' + UserId + '/messages' + '/thread/' + recipientId );
}

sendmessage(id: number, message: Messages) {

  return this.http.post(this.baseurl + 'users/' + id + '/messages', message );

}
}
