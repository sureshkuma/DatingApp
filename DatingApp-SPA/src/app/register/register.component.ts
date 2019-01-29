import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/Auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 model: any = {};

  constructor() { }

  ngOnInit() {

  }
  // tslint:disable-next-line:no-trailing-whitespace
  
  // tslint:disable-next-line:no-trailing-whitespace

  // tslint:disable-next-line:semicolon
  register() {
    console.log(this.model);
  // tslint:disable-next-line:no-trailing-whitespace
  } 
  // tslint:disable-next-line:no-trailing-whitespace


  Cancel() {
    console.log('cancelled');
  }
}
