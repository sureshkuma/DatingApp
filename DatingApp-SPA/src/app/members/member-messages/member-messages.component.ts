import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/Auth.service';
import { AlertifyjsService } from '../../_services/Alertifyjs.service';
import { User } from '../../_models/User';
import { Messages} from '../../_models/Messages';
import { Message } from '../../../../node_modules/@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
 @Input()  recipaintId;
 message: Messages[];
 newmessage: any = {};

  constructor(private authsrvc: AuthService, private usrsrvc: UserService, private alertfy: AlertifyjsService) { }

  ngOnInit() {
    this.loadmessages();
  }

  loadmessages() {
    this.usrsrvc.getmessagethread(this.authsrvc.decodetoken.nameid, this.recipaintId).subscribe((msg: Messages[]) => {
this.message = msg;
    }, error => this.alertfy.error(error));
  }

  sendmessage() {
    this.newmessage.recipaintId = this.recipaintId;
  console.log(this.recipaintId);
    this.usrsrvc.sendmessage(this.authsrvc.decodetoken.nameid, this.newmessage).subscribe((message1: Messages) => {
      this.message.unshift(message1);
      this.newmessage.content = '';
    }, error => this.alertfy.error(error));
  }
}
