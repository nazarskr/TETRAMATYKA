import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    NewsComponent,
    NewsDetailsComponent,
    ProjectDetailsComponent
  ],
  imports: [
      CommonModule,
      SharedModule,
      HomeRoutingModule,
      TranslateModule,
      FormsModule,
      ReactiveFormsModule
  ],
})
export class HomeModule { }
