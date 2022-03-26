import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from "./gallery.component";
import { GalleryDetailsComponent } from './components/gallery-details/gallery-details.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    children: [
      {path: 'chapter/:id', component: GalleryDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
