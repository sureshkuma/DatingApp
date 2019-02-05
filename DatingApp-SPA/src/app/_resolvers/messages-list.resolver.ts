import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { AlertifyjsService } from '../_services/Alertifyjs.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Messages } from '../_models/Messages';
import { AuthService } from '../_services/Auth.service';

@Injectable()
export class MessagesListResolver implements Resolve<Messages[]> {
    PageNumber = 1;
    PageSize1 = 5;
    MessageContainer = 'Unread';
   constructor(private Alrtfyjs: AlertifyjsService, private userservc: UserService,
    private route: Router, private authsrvc: AuthService ) { }

   resolve(routes: ActivatedRouteSnapshot): Observable<Messages[]> {
    return this.userservc.getMessages(this.authsrvc.decodetoken.nameid, this.PageNumber, this.PageSize1, this.MessageContainer ).pipe(
        catchError(error => {
            this.Alrtfyjs.error('problem retreving the data');
            this.route.navigate(['/home']);
            return of(null);
        })
    );
   }

}
