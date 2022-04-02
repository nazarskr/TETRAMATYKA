import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GalleryChapter, GalleryImage } from '@shared/interfaces/gallery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  public galleryUri = '/api/gallery';
  public galleryChaptersUri = '/api/gallery/chapters';
  public galleryChapterUri = '/api/gallery/chapter';

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

  getGalleryChapters(): Observable<GalleryChapter[]> {
    return this.http.get<GalleryChapter[]>(this.galleryChaptersUri);
  }

  getGalleryChapterById(id: string): Observable<GalleryChapter> {
    return this.http.get<GalleryChapter>(`${this.galleryChapterUri}/${id}`);
  }

  addGalleryChapter(data: FormData): Observable<GalleryChapter> {
    return this.http.post<GalleryChapter>(this.galleryChapterUri, data);
  }

  updateGalleryChapter(id: string, data: FormData): Observable<GalleryChapter> {
    return this.http.put<GalleryChapter>(`${this.galleryChapterUri}/${id}`, data);
  }

  deleteGalleryChapter(id: string): Observable<GalleryChapter> {
    return this.http.delete<GalleryChapter>(`${this.galleryChapterUri}/${id}`);
  }
}
