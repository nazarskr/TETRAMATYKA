import { Component, OnInit } from '@angular/core';
import { SimpleDialogComponent } from "@shared/components/simple-dialog/simple-dialog.component";
import { modalConfig } from "@shared/constants/modal-config";
import { filter, takeUntil } from "rxjs/operators";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Project } from "@shared/interfaces/projects";
import { ProjectsService } from "../services/projects.service";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent extends UnsubscribeOnDestroy implements OnInit {
  public editMode = false;
  public projectId: string;
  public projectForm: FormGroup;
  public project: Project;
  public multipartFile: File;
  public imageUrl: SafeUrl;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _projectsService: ProjectsService,
    private _toaster: ToasterService,
    private _translateService: TranslateService,
    private _sanitizer: DomSanitizer,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _location: Location
  ) {
    super();
    this.initForm();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        this.projectId = params.get('id');
        if (this.projectId) {
          this.getProjectById();
        } else {
          this.editMode = true;
        }
      });
  }

  initForm(): void {
    this.projectForm = this._formBuilder.group({
      title_UA: ['', Validators.required],
      title_EN: ['', Validators.required],
      description_UA: ['', Validators.required],
      description_EN: ['', Validators.required],
    })
  }

  formPatchValue(): void {
    this.projectForm.patchValue({
      title_UA: this.project.title.ua,
      title_EN: this.project.title.en,
      description_UA: this.project.description.ua,
      description_EN: this.project.description.en,
    })
  }

  getProjectById(): void {
    this._projectsService.getProjectById(this.projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Project) => {
        this.project = res;
        this.imageUrl = res.imageUrl;
        this.multipartFile = null;
        this.editMode = false;
        this.formPatchValue();
      });
  }

  goBack(): void {
    this._location.back();
  }

  editProject(): void {
    this.editMode = true;
  }

  saveProject(): void {
    if (this.projectForm.invalid) {
      this._toaster.showErrorMessage('Fill all required fields')
      return;
    }

    if (!this.imageUrl && !this.multipartFile) {
      this._toaster.showErrorMessage('Image is required')
      return;
    }

    const formValue = this.projectForm.value;
    const body: Project = {
      title: {
        en: formValue.title_EN,
        ua: formValue.title_UA
      },
      description: {
        en: formValue.description_EN,
        ua: formValue.description_UA
      },
      imageUrl: this.project ? this.project.imageUrl : ''
    }

    const formData = new FormData();
    formData.append('project', JSON.stringify(body));
    if (this.multipartFile) {
      formData.append('image', this.multipartFile);
    }
    this.projectId ? this.updateProject(formData) : this.createProject(formData);
  }

  createProject(formData: FormData): void {
    this._projectsService.createProject(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Project) => {
        this._toaster.showMessage('Project created successfully');
        this.openCreatedProject(res._id);
      });
  }

  updateProject(formData: FormData): void {
    this._projectsService.updateProject(this.projectId, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Participant updated successfully');
        this.getProjectById();
      });
  }

  openCreatedProject(id: string): void {
    this._router.navigate([`projects/${id}`]);
  }

  cancelEditing(): void {
    if (this.projectId) {
      this.goBack();
    } else {
      this.getProjectById();
    }
  }

  openDeleteProjectDialog(): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete participant',
        message: 'Are you sure you want to delete this participant?'
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.deleteProject();
      });
  }

  deleteProject(): void {
    this._projectsService.deleteProject(this.projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.goBack();
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
