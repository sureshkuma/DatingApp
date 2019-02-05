import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyjsService } from '../../_services/Alertifyjs.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/Auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('form') form: NgForm;
user: User;
photoUrl: string;
 @HostListener('window:beforeunload', ['$event'])
 unloadNotification($event: any) {
  if (this.form.dirty) {
    $event.returnValue = true;
  }
 }
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private aletfy: AlertifyjsService, private usersrvc: UserService, private authsrvc: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authsrvc.currenetphotourl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateform() {
    this.usersrvc.Updateuser(this.authsrvc.decodetoken.nameid, this.user).subscribe((next) => {
      this.aletfy.success('successfully profile is upadted');
      this.form.reset(this.user);
    }, error => {
      this.aletfy.error(error);
    });
  }

  setmainphoto($event) {
  console.log(this.user.photoUrl = $event);
  }

}
