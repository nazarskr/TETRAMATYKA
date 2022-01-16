import {Component, OnInit, ViewChild} from '@angular/core';
import { NgxImageGalleryComponent, GALLERY_CONF } from 'ngx-image-gallery';
import {galleryConfig} from "@shared/constants/gallery-config";
import {GalleryImage} from "@shared/interfaces/gallery";
import {galleryMock} from "./gallery-mock";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @ViewChild(NgxImageGalleryComponent, {static: false}) ngxImageGallery: NgxImageGalleryComponent;
  public galleryConfig: GALLERY_CONF = galleryConfig;
  public images: GalleryImage[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getGallery();
  }

  getGallery(): void {
    this.images = galleryMock();
  }

  openGallery(index: number) {
    this.ngxImageGallery.open(index);
  }

  closeGallery() {
    this.ngxImageGallery.close();
  }

}
