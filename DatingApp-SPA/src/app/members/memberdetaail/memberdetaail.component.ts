import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyjsService } from '../../_services/Alertifyjs.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '../../../../node_modules/ngx-gallery';

@Component({
  selector: 'app-memberdetaail',
  templateUrl: './memberdetaail.component.html',
  styleUrls: ['./memberdetaail.component.css']
})
export class MemberdetaailComponent implements OnInit {
user: User;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];
  constructor(private userservice: UserService, private alrtfyjs: AlertifyjsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user);
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
    console.log(imageurls);
    return imageurls;
  }

}
