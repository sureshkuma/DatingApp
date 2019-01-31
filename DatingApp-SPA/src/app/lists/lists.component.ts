import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { AuthService } from '../_services/Auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { AlertifyjsService } from '../_services/Alertifyjs.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likeParams: String;
  constructor(private authsrvc: AuthService, private usersrvc: UserService,
    private route: ActivatedRoute, private alrtfy: AlertifyjsService) { }

  ngOnInit() {
this.route.data.subscribe((data) => {
this.users =  data['user1'].Result;
this.pagination = data['user1'].pagination;
});
this.likeParams = 'Likers';
  }

  loadusers() {
    this.usersrvc.getusers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likeParams ).
    subscribe((res: PaginatedResult<User[]>) => {
    this.users = res.Result;
    this.pagination = res.pagination;
    }, error => {
      this.alrtfy.error(error);
    });
    }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadusers();
  }
}
