import { Resolve, Router, ActivatedRouteSnapshot } from '../../../node_modules/@angular/router';
import { User } from '../_models/User';
import { AlertifyjsService } from '../_services/Alertifyjs.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from '../../../node_modules/rxjs';
import { catchError } from '../../../node_modules/rxjs/operators';
import { Injectable } from '../../../node_modules/@angular/core';
import { AuthService } from '../_services/Auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

   // tslint:disable-next-line:max-line-length
   constructor(private Alrtfyjs: AlertifyjsService, private userservc: UserService, private route: Router, private authsrvc: AuthService ) { }

   resolve(routes: ActivatedRouteSnapshot): Observable<User> {
       console.log(this.authsrvc.decodetoken.nameid);
    return this.userservc.Getuser(this.authsrvc.decodetoken.nameid).pipe(
        catchError(error => {
            this.Alrtfyjs.error(error);
            this.route.navigate(['/members']);
            return of(error);
        })
    );
   }

}
