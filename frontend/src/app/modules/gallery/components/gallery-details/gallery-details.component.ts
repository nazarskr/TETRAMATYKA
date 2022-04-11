import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {GALLERY_CONF, NgxImageGalleryComponent} from 'ngx-image-gallery';
import {tetramatykaGallery} from '@shared/constants/gallery';
import {GalleryChapter, GalleryImage} from "@shared/interfaces/gallery";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UnsubscribeOnDestroy} from '@shared/directives/unsubscribe-on-destroy';
import {filter, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddImagesComponent} from '../add-images/add-images.component';
import {ToasterService} from '@shared/services/toaster/toaster.service';
import {GalleryService} from '../../services/gallery.service';
import {SimpleDialogComponent} from '@shared/components/simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryDetailsComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild(NgxImageGalleryComponent, {static: false}) ngxImageGallery: NgxImageGalleryComponent;
  public galleryConfig: GALLERY_CONF = tetramatykaGallery.galleryConfig;
  public images: any[] = [];
  public selectedGalleryChapterId: string;
  public selectedGalleryChapter: GalleryChapter;
  public isDeleteConfirm = true;
  public imagePlaceholder = 'url(../../../../../assets/images/image-placeholder-horizontal.jpeg)';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _toaster: ToasterService,
    private _galleryService: GalleryService
  ) {
    super();
    this.detectRouterState();
  }

  ngOnInit(): void {
  }

  getGallery(): void {
    this._galleryService
      .getGallery(this.selectedGalleryChapterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: GalleryImage[]) => {
        this.images = res.map((item: GalleryImage) => {
          item.url = item.imageUrl;
          item.backgroundUrl = `url(${item.imageUrl})`
          return item;
        });
      })
  }

  getGalleryChapter(): void {
    this._galleryService.getGalleryChapterById(this.selectedGalleryChapterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: GalleryChapter) => {
        this.selectedGalleryChapter = res;
      })
  }

  openGallery(index: number) {
    this.ngxImageGallery.open(index);
  }

  closeGallery() {
    this.ngxImageGallery.close();
  }

  detectRouterState(): void {
    this._route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        this.selectedGalleryChapterId = id;
        this.getGallery();
        this.getGalleryChapter();
      });
  }

  openAddGalleryImageDialog(): void {
    const dialogRef = this._dialog.open(AddImagesComponent, {
      width: '600px',
      data: {
        header: {
          en: 'Add images for ',
          ua: 'Додати зображення для '
        },
        galleryChapter: this.selectedGalleryChapter
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(res => res),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this._toaster.showMessage('Images uploaded successfully');
        this.getGallery();
      })
  }

  goToGallery(): void {
    this._router.navigate(['gallery']).then();
  }

  onRemoveImage(item: GalleryImage, event: MouseEvent): void {
    event.stopPropagation();
    this.isDeleteConfirm ? this.openDeleteImageDialog(item) : this.deleteGalleryImage(item._id);
  }

  onChangePreview(item: GalleryImage, event: MouseEvent): void {
    event.stopPropagation();
    item.displayPreview = !item.displayPreview;
  }

  openDeleteImageDialog(item: GalleryImage): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete gallery image',
        message: 'Are you sure you want to delete this image?'
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(res => res),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.deleteGalleryImage(item._id);
      })
  }

  deleteGalleryImage(id: string): void {
    this._galleryService.deleteGalleryImage(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getGallery();
      })
  }

}
