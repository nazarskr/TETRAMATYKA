import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { WorksItemShort } from '@shared/interfaces/works';
import { WorksService } from './services/works.service';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent extends UnsubscribeOnDestroy implements OnInit {
  public works: WorksItemShort[] = [];

  constructor(private _worksService: WorksService) {
    super();
  }

  ngOnInit(): void {
    this.getAllWorksShort();
  }

  getAllWorksShort(): void {
    this._worksService.getAllWorksShort()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: WorksItemShort[]) => {
        // TODO: remove mock
        //this.works = res;
        this.works = [
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
          {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        ];
      })
  }

}
