import { Injectable } from '../../../node_modules/@angular/core';
// tslint:disable-next-line:max-line-length
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { catchError } from '../../../node_modules/rxjs/operators';

@Injectable()

export class ErrorInterCeptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       return next.handle(req).pipe(
           catchError(error => {
            // tslint:disable-next-line:no-trailing-whitespace
            if (error.status === '401') {
                return throwError('unAuthorized');
            }
            if (error instanceof HttpErrorResponse) {
                const applicationerror = error.headers.get('Application-error');
                if (applicationerror) {
                    return throwError(applicationerror);
                }
            }
            const servererror = error.error;
            // tslint:disable-next-line:whitespace
            let modelstateerrors = '';
            if (servererror && servererror === 'object') {
                // tslint:disable-next-line:forin
                for (const key in servererror) {
                    if (servererror[key]) {
                        modelstateerrors += servererror[key] + '\n';
                    }

                }
            }
            return throwError(servererror || modelstateerrors || 'server error');
           })
       );
    }
// tslint:disable-next-line:eofline
}

export const ErrorIntercepprovider = {
provide: HTTP_INTERCEPTORS,
useClass: ErrorInterCeptor,
multi: true,
// tslint:disable-next-line:eofline
};