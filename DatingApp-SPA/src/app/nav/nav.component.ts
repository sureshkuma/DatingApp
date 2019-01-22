import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { NgForm } from '../../../node_modules/@angular/forms';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  login(model: NgForm) {
this.authservice.Login(model.value).subscribe(next => {
  console.log('login in successfully');
}, error => {
  console.log('lofined failed');
});
  }

  loggedin() {
    const token = localStorage.getItem('token');

    return !!token;
  }

  Logout() {
    localStorage.removeItem('token');
    console.log('logout successfully');
  }
}
