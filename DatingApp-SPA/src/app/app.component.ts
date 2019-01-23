import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/Auth.service';
import { JwtHelperService } from '../../node_modules/@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwthelper = new JwtHelperService();
  decodetoken: any;
  constructor(private authservice: AuthService) {}

  ngOnInit() {
   const token = localStorage.getItem('token');
   if (token) {
    this.authservice.decodetoken = this.jwthelper.decodeToken(token);
   }

  }
}
