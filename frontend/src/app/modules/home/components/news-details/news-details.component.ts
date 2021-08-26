import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Project } from "@shared/interfaces/projects";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import { filter, takeUntil } from "rxjs/operators";
import { SimpleDialogComponent } from "@shared/components/simple-dialog/simple-dialog.component";
import { modalConfig } from "@shared/constants/modal-config";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { NewsService } from "../../services/news.service";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent extends UnsubscribeOnDestroy implements OnInit {
  public editMode = false;
  public newsItemId: string;
  public newsItemForm: FormGroup;
  public newsItem: Project;
  public multipartFile: File;
  public imageUrl: SafeUrl;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _newsService: NewsService,
    private _toaster: ToasterService,
    private _translateService: TranslateService,
    private _sanitizer: DomSanitizer,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {
    super();
    this.initForm();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        this.newsItemId = params.get('id');
        if (this.newsItemId) {
          this.getNewsItemById();
        } else {
          this.editMode = true;
        }
      });
  }

  initForm(): void {
    this.newsItemForm = this._formBuilder.group({
      title_UA: ['', Validators.required],
      title_EN: ['', Validators.required],
      description_UA: ['', Validators.required],
      description_EN: ['', Validators.required],
    })
  }

  formPatchValue(): void {
    this.newsItemForm.patchValue({
      title_UA: this.newsItem.title.ua,
      title_EN: this.newsItem.title.en,
      description_UA: this.newsItem.description.ua,
      description_EN: this.newsItem.description.en,
    })
  }

  getNewsItemById(): void {
    this._newsService.getNewsItemById(this.newsItemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Project) => {
        this.newsItem = res;
        this.imageUrl = res.imageUrl;
        this.multipartFile = null;
        this.editMode = false;
        this.formPatchValue();
      });
  }

  goToHome(): void {
    this._router.navigate(['/home'])
  }

  editNewsItem(): void {
    this.editMode = true;
  }

  saveNewsItem(): void {
    if (this.newsItemForm.invalid) {
      this._toaster.showErrorMessage('Fill all required fields')
      return;
    }

    if (!this.imageUrl && !this.multipartFile) {
      this._toaster.showErrorMessage('Image is required')
      return;
    }

    const formValue = this.newsItemForm.value;
    const body: Project = {
      title: {
        en: formValue.title_EN,
        ua: formValue.title_UA
      },
      description: {
        en: formValue.description_EN,
        ua: formValue.description_UA
      },
      imageUrl: this.newsItem ? this.newsItem.imageUrl : ''
    }

    const formData = new FormData();
    formData.append('newsItem', JSON.stringify(body));
    if (this.multipartFile) {
      formData.append('image', this.multipartFile);
    }
    this.newsItemId ? this.updateNewsItem(formData) : this.createNewsItem(formData);
  }

  createNewsItem(formData: FormData): void {
    this._newsService.createNewsItem(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Project) => {
        this._toaster.showMessage('Project created successfully');
        this.openCreatedNewsItem(res._id);
      });
  }

  updateNewsItem(formData: FormData): void {
    this._newsService.updateNewsItem(this.newsItemId, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Participant updated successfully');
        this.getNewsItemById();
      });
  }

  openCreatedNewsItem(id: string): void {
    this._router.navigate([`home/news/${id}`]);
  }

  cancelEditing(): void {
    if (this.newsItemId) {
      this.goToHome();
    } else {
      this.getNewsItemById();
    }
  }

  openDeleteNewsItemDialog(): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete news item',
        message: 'Are you sure you want to delete this news item?'
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.deleteNewsItem();
      });
  }

  deleteNewsItem(): void {
    this._newsService.deleteNewsItem(this.newsItemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('News item deleted successfully');
        this.goToHome();
      })
  }

  changeImage(data: any): void {
    this.multipartFile = data.file;
    this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(data.url);
  }

  openClearImageDialog(): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, modalConfig.clearImage);
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(res => !!res))
      .subscribe(() => {
        this.clearImage();
      });
  }

  clearImage(): void {
    this.multipartFile = null;
    this.imageUrl = null;
  }
}
