import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news/create', component: NewsDetailsComponent},
  {path: 'news/:id', component: NewsDetailsComponent},
  {path: 'project/create', component: ProjectDetailsComponent},
  {path: 'project/:id', component: ProjectDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
