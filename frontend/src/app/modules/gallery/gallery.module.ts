import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { GalleryVideoComponent } from './components/gallery-video/gallery-video.component';
import { GalleryPhotoComponent } from './components/gallery-photo/gallery-photo.component';


@NgModule({
  declarations: [GalleryComponent, GalleryVideoComponent, GalleryPhotoComponent],
  imports: [
    CommonModule,
    SharedModule,
    GalleryRoutingModule
  ]
})
export class GalleryModule { }
