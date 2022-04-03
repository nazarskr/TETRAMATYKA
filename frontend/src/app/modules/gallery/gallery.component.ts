import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GalleryChapter, GalleryImage} from '@shared/interfaces/gallery';
import {TranslateService} from '@ngx-translate/core';
import {GALLERY_CONF, NgxImageGalleryComponent} from "ngx-image-gallery";
import {tetramatykaGallery} from "@shared/constants/gallery";
import {filter, takeUntil} from "rxjs/operators";
import {GalleryService} from "./services/gallery.service";
import {UnsubscribeOnDestroy} from "@shared/directives/unsubscribe-on-destroy";
import {UserService} from "@core/services/user.service";
import {RoleEnum} from "@shared/enums/role";
import {MatDialog} from "@angular/material/dialog";
import {AddEditChapterComponent} from "./components/add-edit-chapter/add-edit-chapter.component";
import {ToasterService} from "@shared/services/toaster/toaster.service";
import {SimpleDialogComponent} from "@shared/components/simple-dialog/simple-dialog.component";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild(NgxImageGalleryComponent, {static: false}) ngxImageGallery: NgxImageGalleryComponent;
  public galleryChapters: GalleryChapter[] = [];
  public galleryConfig: GALLERY_CONF = tetramatykaGallery.galleryConfig;
  public images: any[] = [];
  public noImagesMessage = {
    ua: 'У цьому розділі ще немає зображень',
    en: 'There are no images in this chapter yet'
  }

  get lang(): string {
    return this._translateService.currentLang;
  }

  get isAdmin(): boolean {
    return this._userService.userInfo.role === RoleEnum.ADMIN;
  }

  get isParentRoute(): boolean {
    return this._route.children.length === 0;
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _translateService: TranslateService,
    private _galleryService: GalleryService,
    private _userService: UserService,
    private _dialog: MatDialog,
    private _toaster: ToasterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getGalleryChapters();
  }

  getGalleryChapters(): void {
    this._galleryService.getGalleryChapters()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: GalleryChapter[]) => {
        this.galleryChapters = res;
      })
  }

  getGallery(id: string): void {
    this._galleryService
      .getGallery(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: GalleryImage[]) => {
        if (res.length > 0) {
          this.images = res.map((item: GalleryImage) => {
            item.url = item.imageUrl;
            return item;
          });
          setTimeout(() => {
            this.openGallery();
          }, 500);
        } else {
          this.images = [];
          this._toaster.showWarningMessage(this.noImagesMessage[this.lang]);
        }
      })
  }

  openAddChapterDialog(): void {
    const dialogRef = this._dialog.open(AddEditChapterComponent, {
      data: {
        title: {
          ua: 'Додати розділ галереї',
          en: 'Add gallery chapter'
        }
      }
    });
    dialogRef.afterClosed()
      .pipe(
        filter(res => !!res),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.getGalleryChapters();
    })
  }

  openEditChapterDialog(chapter: GalleryChapter): void {
    const dialogRef = this._dialog.open(AddEditChapterComponent, {
      data: {
        title: {
          ua: 'Редагувати розділ галереї',
          en: 'Edit gallery chapter'
        },
        item: chapter
      }
    });
    dialogRef.afterClosed()
      .pipe(
        filter(res => !!res),
        takeUntil(this.destroy$)
      ).subscribe(() => {
      this.getGalleryChapters();
    })
  }

  onChapterClicked(id: string): void {
    this.getGallery(id);
  }

  openGallery() {
    this.ngxImageGallery.open(0);
  }

  checkChapterDeletion(id: string): void {
    this._galleryService
      .getGallery(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: GalleryImage[]) => {
        if (res.length > 0) {
          this._toaster.showWarningMessage('You cannot delete this chapter because it contains images. Please delete images before.')
        } else {
          this.openDeleteChapterDialog(id);
        }
      })
  }

  openDeleteChapterDialog(id: string): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete gallery chapter',
        message: `Are you sure you want to delete this chapter?`
      }
    });
    dialogRef.afterClosed()
      .pipe(
        filter(res => !!res),
        takeUntil(this.destroy$)
      ).subscribe(() => {
      this.deleteGalleryChapter(id);
    })
  }

  deleteGalleryChapter(id: string): void {
    this._galleryService.deleteGalleryChapter(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Chapter deleted successfully');
        this.getGalleryChapters();
      })
  }

}
