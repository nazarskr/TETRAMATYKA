import { Component, OnInit } from '@angular/core';
import { NewsItemShort } from '@shared/interfaces/news';
import { ProjectShort } from '@shared/interfaces/projects';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { NewsService } from '../../services/news.service';
import { ProjectsService } from '../../../projects/services/projects.service';
import { forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
      .subscribe((res: [NewsItemShort[], ProjectShort[]]) => {
        // TODO remove mock
        // this.news = res[0];
        // this.projects = res[1];
        this.news = [
          {title: {ua: 'Solaris. Цикл перформансів до 100-річчя Станіслава Лема', en: 'Testtest news'}, _id: '6123b11ab57f9822c89e2edc',  imageUrl: '../../../assets/images/barabash.jpeg', createdAt: new Date()},
          {title: {ua: 'Тестовa новина', en: 'Testtest news'}, _id: '6123b11ab57f9822c89e2edc',  imageUrl: '../../../assets/images/poster-tetramatyka.jpg', createdAt: new Date()},
          {title: {ua: 'Тестовa новина', en: 'Testtest news'}, _id: '6123b11ab57f9822c89e2edc',  imageUrl: '../../../assets/images/barabash.jpeg', createdAt: new Date()},
        ];
        this.projects = [
          {title: {ua: 'Solaris. Цикл перформансів до 100-річчя Станіслава Лема', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/barabash.jpeg'},
          {title: {ua: 'Solaris. Цикл перформансів до 100-річчя Станіслава Лема', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/barabash.jpeg'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/barabash.jpeg'},
          {title: {ua: 'Solaris. Цикл перформансів до 100-річчя Станіслава Лема. Solaris. Цикл перформансів до 100-річчя Станіслава Лема', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/poster-tetramatyka.jpg'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/sensoteka-lviv-logo.png'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/barabash.jpeg'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/sensoteka-lviv-logo.png'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/barabash.jpeg'},
          {title: {ua: 'Тестовийтест тест проект лвиапдлмдлсцтл лцуоталот', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/poster-tetramatyka.jpg'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8', imageUrl: '../../../assets/images/barabash.jpeg'},
        ]
      })
  }

}
