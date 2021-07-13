import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { GalleryPhotoComponent } from './components/gallery-photo/gallery-photo.component';
import { GalleryVideoComponent } from './components/gallery-video/gallery-video.component';

const routes: Routes = [
  {path: '', component: GalleryComponent, children: [
      {path: 'photo', component: GalleryPhotoComponent},
      {path: 'video', component: GalleryVideoComponent},
      {path: '', redirectTo: 'photo', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
