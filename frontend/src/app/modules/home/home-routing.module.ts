import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news/:id', component: NewsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
