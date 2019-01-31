import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs';
import { User } from '../_models/User';
import { PaginatedResult } from '../_models/Pagination';
import { map } from '../../../node_modules/rxjs/operators';



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
}
