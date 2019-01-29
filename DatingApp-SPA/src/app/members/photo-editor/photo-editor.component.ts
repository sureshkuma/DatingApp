import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/Auth.service';
import { AlertifyjsService } from '../../_services/Alertifyjs.service';
import { UserService } from '../../_services/user.service';
import { findIndex } from '../../../../node_modules/rxjs/operators';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getphotourl = new EventEmitter<string>();
  baseurl = environment.apiurl;
  uploader: FileUploader;
   hasBaseDropZoneOver = false;
   currentmain: Photo;
   fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  constructor(private authservc: AuthService, private Alrtfyjs: AlertifyjsService, private usersrvc: UserService) { }

  ngOnInit() {
    this.initilizailoader();
  }

  initilizailoader() {
    this.uploader = new FileUploader({
      url: this.baseurl + 'users/' + this.authservc.decodetoken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          descripation: res.descripation,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  Setmainphoto(photo: Photo) {
    this.usersrvc.SetMainPhot(this.authservc.decodetoken.nameid, photo.id).subscribe(() => {
      this.currentmain = this.photos.filter(p => p.isMain === true)[0];
     this.authservc.ChangeMemberPhoto(photo.url);
     this.authservc.currentuser.photoUrl = photo.url;
     localStorage.setItem('user', JSON.stringify(this.authservc.currentuser) );
      this.currentmain.isMain = false;
      photo.isMain = true;
    }, error => this.Alrtfyjs.error(error));
  }

  deletephotto(id: number) {
    this.Alrtfyjs.confirm('Are You sure you want to delete the photo?', () => {
    this.usersrvc.DeletePhoto(this.authservc.decodetoken.nameid, id).subscribe(() => {
      this.photos.slice(this.photos.findIndex(p => p.id === id), 1);
      this.Alrtfyjs.success('pyour photo has been deleted successfully');
      }, error => {
        this.Alrtfyjs.error(error);
      });
    });
  }

}
