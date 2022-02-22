import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GalleryChapter} from '@shared/interfaces/gallery';
import {tetramatykaGallery} from '@shared/constants/gallery';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public galleryChapters: GalleryChapter[] = tetramatykaGallery.galleryChapters;

  get routeChildren(): any[] {
    return this._route.children;
  }

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }

  openGalleryChapter(chapter: GalleryChapter): void {
    this._router.navigate([`gallery/${chapter.route}`]).then();
  }

}
