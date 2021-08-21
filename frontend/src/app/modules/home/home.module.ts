import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NewsComponent } from './components/news/news.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';


@NgModule({
  declarations: [HomeComponent, NewsComponent, NewsItemComponent, NewsDetailsComponent],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule,
        TranslateModule,
        ReactiveFormsModule
    ],
})
export class HomeModule { }
