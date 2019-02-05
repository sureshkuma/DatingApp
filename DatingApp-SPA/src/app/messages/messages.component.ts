import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Messages } from '../_models/Messages';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { AuthService } from '../_services/Auth.service';
import { AlertifyjsService } from '../_services/Alertifyjs.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
message: Messages[];
pagination: Pagination;
MessageContainer: 'Unread';
  constructor(private usersrvc: UserService, private route: ActivatedRoute,
    private authservc: AuthService, private alrtfy: AlertifyjsService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.message = data['message'].Result;
      this.pagination = data['message'].pagination;
    });
  }

  loadMessage() {
    this.usersrvc.getMessages(this.authservc.decodetoken.nameid, this.pagination.currentPage,
    this.pagination.itemsPerPage, this.MessageContainer).subscribe((res: PaginatedResult<Messages[]>) => {
      this.message = res.Result;
      this.pagination = res.pagination;
      console.log(this.MessageContainer);
    }, error => this.alrtfy.error(error));
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessage();
  }
}
