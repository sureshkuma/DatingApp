import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/Auth.service';
import { AlertifyjsService } from '../_services/Alertifyjs.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private route: Router, private alrtifysrvc: AlertifyjsService) {}
  canActivate(): boolean {
    if (this.authservice.Loggedinn()) {
      return true;
    }

    this.alrtifysrvc.error('you have to login to access contents of the application');
    this.route.navigate(['/home']);
    return false;

  }
}
