import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { NgForm } from '@angular/forms';
import { AlertifyjsService } from '../_services/Alertifyjs.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
photoUrl: string;
  constructor(public authservice: AuthService, private alertfyservc: AlertifyjsService, private route: Router) { }

  ngOnInit() {
    this.authservice.currenetphotourl.subscribe(photoUrl => this.photoUrl = photoUrl);
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
    localStorage.removeItem('user');
    this.authservice.decodetoken = null;
    this.authservice.currentuser = null;
    this.alertfyservc.message('logout successfully');
    this.route.navigate(['']);
  }
}
