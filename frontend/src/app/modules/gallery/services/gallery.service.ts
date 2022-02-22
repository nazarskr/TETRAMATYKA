import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GalleryImage } from '@shared/interfaces/gallery';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  public galleryUri = '/api/gallery';

  constructor(private http: HttpClient) { }

  getGallery(galleryChapter: string) {
    const params = {galleryChapter};
    return this.http.get(this.galleryUri, {params});
  }

  addGalleryImages(galleryChapter: string, data: FormData) {
    const params = {galleryChapter};
    return this.http.post(this.galleryUri, data, {
      reportProgress: true, observe: 'events', params
    });
  }

  deleteGalleryImage(id: string): Observable<GalleryImage> {
    return this.http.delete<GalleryImage>(`${this.galleryUri}/${id}`);
  }
}
