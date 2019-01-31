import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyjsService } from '../../_services/Alertifyjs.service';
import { AuthService } from '../../_services/Auth.service';

@Component({
  selector: 'app-members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.css']
})
export class MembersCardComponent implements OnInit {
 @Input() user1: User[];
  constructor(private usersrvc: UserService, private alrtfy: AlertifyjsService, private authsrvc: AuthService) { }

  ngOnInit() {
    console.log(this.user1);
  }

  SendLike(id: number) {
    this.usersrvc.sendLike(this.authsrvc.decodetoken.nameid, id).subscribe((data) => {
      this.alrtfy.success('You have liked the user ');
    }, error => this.alrtfy.error(error));
  }

}
