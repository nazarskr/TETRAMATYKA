import { Component, OnInit } from '@angular/core';
import { NewsItemShort } from '@shared/interfaces/news';
import { ProjectShort } from '@shared/interfaces/projects';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { NewsService } from '../../services/news.service';
import { ProjectsService } from '../../services/projects.service';
import { forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends UnsubscribeOnDestroy implements OnInit {
  public news: NewsItemShort[] = [];
  public projects: ProjectShort[] = [];

  constructor(
    private _newsService: NewsService,
    private _projectsService: ProjectsService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getNewsAndProjects();
  }

  getNewsAndProjects(): void {
    forkJoin([
      this._newsService.getAllNewsItems(),
      this._projectsService.getAllProjects()
    ]).pipe(takeUntil(this.destroy$))
      .subscribe((res: [NewsItemShort[], ProjectShort[]]) => {
        this.news = res[0];
        this.projects = res[1];
      })
  }

}
