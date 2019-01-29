import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { JwtModule } from '../../node_modules/@auth0/angular-jwt';
import {NgxGalleryModule} from 'ngx-gallery';
import { FileUploadModule } from '../../node_modules/ng2-file-upload';


import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/Auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorIntercepprovider } from './_services/error.interceptor';
import { AlertifyjsService } from './_services/Alertifyjs.service';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import {appRoutes} from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MembersCardComponent } from './members/members-card/members-card.component';
import { MemberdetaailComponent } from './members/memberdetaail/memberdetaail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';



export function GetToken() {
    return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MemberListComponent,
      MessagesComponent,
      MembersCardComponent,
      MemberdetaailComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      FileUploadModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      JwtModule.forRoot({
          config: {
              tokenGetter: GetToken,
              whitelistedDomains: ['localhost:5000'],
              blacklistedRoutes: ['localhost:5000/api/auth']
          }
      })
   ],
   providers: [
      AuthService,
      ErrorIntercepprovider,
      AlertifyjsService,
      AuthGuard,
      UserService,
      MemberListResolver,
      MemberDetailResolver,
      MemberEditResolver,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
