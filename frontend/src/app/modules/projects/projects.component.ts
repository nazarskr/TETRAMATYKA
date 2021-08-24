import { Component, OnInit } from '@angular/core';
import { Project } from "@shared/interfaces/projects";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { ProjectsService } from "./services/projects.service";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends UnsubscribeOnDestroy implements OnInit {
  public projects: Project[] = [];

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _projectsService: ProjectsService,
    private _translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllProjectsShort();
  }

  getAllProjectsShort(): void {
    this._projectsService.getAllProjectsShort()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Project[]) => {
        this.projects = res;
      })
  }

}
