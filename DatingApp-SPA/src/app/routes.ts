import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberdetaailComponent } from './members/memberdetaail/memberdetaail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListResolver } from './_resolvers/list-resolver';
import { MessagesListResolver } from './_resolvers/messages-list.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver }},
            {path: 'members/:id', component: MemberdetaailComponent, resolve: {user: MemberDetailResolver}},
            // tslint:disable-next-line:max-line-length
            {path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
            {path: 'messages', component: MessagesComponent, resolve: {message: MessagesListResolver}},
            {path: 'lists', component: ListsComponent, resolve: {user1: ListResolver}},
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
