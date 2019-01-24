import { Resolve, Router, ActivatedRouteSnapshot } from '../../../node_modules/@angular/router';
import { User } from '../_models/User';
import { AlertifyjsService } from '../_services/Alertifyjs.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from '../../../node_modules/rxjs';
import { catchError } from '../../../node_modules/rxjs/operators';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

   constructor(private Alrtfyjs: AlertifyjsService, private userservc: UserService, private route: Router ) { }

   resolve(routes: ActivatedRouteSnapshot): Observable<User> {
    return this.userservc.Getuser(routes.params['id']).pipe(
        catchError(error => {
            this.Alrtfyjs.error('problem retreving the data');
            this.route.navigate(['/members']);
            return of(null);
        })
    );
   }

}
