import { Component, OnInit } from '@angular/core';
import { NewsItem } from '@shared/interfaces/news';
import { Project } from '@shared/interfaces/projects';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { NewsService } from '../../services/news.service';
import { ProjectsService } from '../../../projects/services/projects.service';
import {forkJoin} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends UnsubscribeOnDestroy implements OnInit {
  public news: NewsItem[] = [];
  public projects: Project[] = [];

  constructor(
    private _newsService: NewsService,
    private _projectsService: ProjectsService
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
      .subscribe((res: [NewsItem[], Project[]]) => {
        this.news = res[0];
        this.projects = res[1];
      })
  }

}
