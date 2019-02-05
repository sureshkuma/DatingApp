import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { AlertifyjsService } from '../_services/Alertifyjs.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    PageNumber = 1;
    PageSize1 = 5;
   constructor(private Alrtfyjs: AlertifyjsService, private userservc: UserService, private route: Router ) { }

   resolve(routes: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userservc.getusers(this.PageNumber, this.PageSize1).pipe(
        catchError(error => {
            this.Alrtfyjs.error('problem retreving the data');
            this.route.navigate(['/home']);
            return of(null);
        })
    );
   }

}
