import { Component, OnInit } from '@angular/core';
import {filter, takeUntil} from 'rxjs/operators';
import { WorksItemShort } from '@shared/interfaces/works';
import { WorksService } from './services/works.service';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import {Router} from '@angular/router';
import {AddEditWorksItemComponent} from './components/add-edit-works-item/add-edit-works-item.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent extends UnsubscribeOnDestroy implements OnInit {
  public works: WorksItemShort[] = [];

  constructor(
    private _dialog: MatDialog,
    private _worksService: WorksService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllWorksShort();
  }

  getAllWorksShort(): void {
    this._worksService.getAllWorksShort()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: WorksItemShort[]) => {
        this.works = res;
        // this.works = [
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        //   {title: {ua: 'Тестовий твір', en: 'Test piece'}, _id: '6123a214c388a9224478c042'},
        // ];
      })
  }

  addWorksItem(): void {
    const dialogRef = this._dialog.open(AddEditWorksItemComponent, {
      data: {
        title: 'Add works item',
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(res => !!res))
      .subscribe((res: boolean) => {
        this.getAllWorksShort();
      });
  }

}
