import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyjsService } from '../../_services/Alertifyjs.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-memberdetaail',
  templateUrl: './memberdetaail.component.html',
  styleUrls: ['./memberdetaail.component.css']
})
export class MemberdetaailComponent implements OnInit {
  @ViewChild('memberTabs')  memberTabs: TabsetComponent;
user: User;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];
  constructor(private userservice: UserService, private alrtfyjs: AlertifyjsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user);
    });

    this.route.queryParams.subscribe(params => {
      const selecttab = params['tab'];
      this.memberTabs.tabs[selecttab > 0 ? selecttab : 0].active = true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getimages();
  }

  getimages() {
    const imageurls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageurls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        descripation: this.user.photos[i].descripation
      });
    }
  return imageurls;
  }

  localTabs(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

}
