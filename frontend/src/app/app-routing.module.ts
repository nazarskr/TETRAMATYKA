import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminGuard} from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module')
      .then(m => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/about/about.module')
      .then(m => m.AboutModule),
  },
  {
    path: 'program',
    loadChildren: () => import('./modules/program/program.module')
      .then(m => m.ProgramModule),
  },
  {
    path: 'gallery',
    loadChildren: () => import('./modules/gallery/gallery.module')
      .then(m => m.GalleryModule),
  },
  {
    path: 'archive',
    loadChildren: () => import('./modules/archive/archive.module')
      .then(m => m.ArchiveModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./modules/page-not-found/page-not-found.module')
      .then(m => m.PageNotFoundModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: '/page-not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
