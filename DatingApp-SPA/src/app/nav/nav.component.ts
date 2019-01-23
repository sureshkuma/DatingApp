import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AlertifyjsService } from '../_services/Alertifyjs.service';
import { Router } from '../../../node_modules/@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(public authservice: AuthService, private alertfyservc: AlertifyjsService, private route: Router) { }

  ngOnInit() {
  }

  login(model: NgForm) {
this.authservice.Login(model.value).subscribe(next => {
  this.alertfyservc.success('login in successfully');
}, error => {
 this.alertfyservc.error('lofined failed');
}, () => { this.route.navigate(['/members']); });
  }

  loggedin() {
    return this.authservice.Loggedinn();
  }

  Logout() {
    localStorage.removeItem('token');
    this.alertfyservc.message('logout successfully');
    this.route.navigate(['']);
  }
}
