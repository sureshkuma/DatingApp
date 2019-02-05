import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyjsService } from '../../_services/Alertifyjs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/Pagination';
import { load } from '@angular/core/src/render3/instructions';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
users: User[];
user: User = JSON.parse(localStorage.getItem('user'));
genderlist = [{value: 'male', display: 'males'}, {value: 'female', display: 'females'}];
@ViewChild('form') userParams1: NgForm;
userParams: any = {};
pagination1: Pagination;
  constructor(private userservc: UserService, private alrtfyjs: AlertifyjsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].Result;
      this.pagination1 = data['users'].pagination;
      console.log(this.userParams1);
    });

   this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
   this.userParams.minAge = 18;
   this.userParams.maxAge = 99;
   this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination1.currentPage = event.page;
    this.loadusers();
  }

  resetfilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
   this.userParams.minAge = 18;
   this.userParams.maxAge = 99;
   this.loadusers();
  }

loadusers() {
this.userservc.getusers(this.pagination1.currentPage, this.pagination1.itemsPerPage,  this.userParams, null).
subscribe((res: PaginatedResult<User[]>) => {
this.users = res.Result;
this.pagination1 = res.pagination;
}, error => {
  this.alrtfyjs.error(error);
});
}

}
