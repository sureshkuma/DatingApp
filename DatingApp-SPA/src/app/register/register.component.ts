import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/Auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/User';
import { Router } from '@angular/router';
import { AlertifyjsService } from '../_services/Alertifyjs.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 model: any = {};
 user: User;
 registrationform: FormGroup;
 bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder, private router: Router, private authsrvc: AuthService, private alrtifyjs: AlertifyjsService) { }

  ngOnInit() {
    this.bsConfig = {
containerClass: 'theme-red'
    };
    this.createregisterform();
  }

  createregisterform() {
    this.registrationform =  this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      KnownAs: ['', Validators.required],
      dateofBirth: ['', Validators.required],
      city: ['', Validators.required],
      country:  ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confimpassword: ['', Validators.required]
    }, {validator: this.passwordmatchvalidator});
  }
  passwordmatchvalidator(g: FormGroup) {
    return g.get('password').value === g.get('confimpassword').value ? '' : {'mismatch': true};
  }
  // tslint:disable-next-line:no-trailing-whitespace
  
  // tslint:disable-next-line:no-trailing-whitespace

  // tslint:disable-next-line:semicolon
  register() {
    if (this.registrationform.valid) {
      this.user = Object.assign({}, this.registrationform.value);
      this.authsrvc.register(this.user).subscribe(() => {
        this.alrtifyjs.success('registration was done successfully');
      }, error => {
        this.alrtifyjs.error(error);
      }, () => {
        this.authsrvc.Login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        }) ;
      });
    }
  console.log(this.registrationform);
  // tslint:disable-next-line:no-trailing-whitespace
  } 
  // tslint:disable-next-line:no-trailing-whitespace


  Cancel() {
    console.log('cancelled');
  }
}
