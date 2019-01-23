import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthService } from '../_services/Auth.service';
import { AlertifyjsService } from '../_services/Alertifyjs.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 model: any = {};
  constructor(private authservice: AuthService, private alertfyservc: AlertifyjsService) { }

  ngOnInit() {
  }
  // tslint:disable-next-line:no-trailing-whitespace

  register(form: NgForm) {
   this.authservice.register(form.value).subscribe(() => {
     this.alertfyservc.success('registartion is done successfully');
   }, error => {
    this.alertfyservc.error(error);
   });
  }

  Cancel() {
    // tslint:disable-next-line:no-trailing-whitespace
    console.log('cancelled');
  }
}
