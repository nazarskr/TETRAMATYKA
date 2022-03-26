import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { NgxImageGalleryModule } from "ngx-image-gallery";
import { GalleryDetailsComponent } from './components/gallery-details/gallery-details.component';
import { AddImagesComponent } from './components/add-images/add-images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditChapterComponent } from './components/add-edit-chapter/add-edit-chapter.component';


@NgModule({
  declarations: [GalleryComponent, GalleryDetailsComponent, AddImagesComponent, AddEditChapterComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    TranslateModule,
    SharedModule,
    NgxImageGalleryModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GalleryModule { }
