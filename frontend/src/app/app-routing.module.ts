import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';
import { UserGuard } from "@core/guards/user.guard";
import { NonAuthGuard } from "@core/guards/non-auth.guard";

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
    path: 'works',
    loadChildren: () => import('./modules/works/works.module')
      .then(m => m.WorksModule),
  },
  {
    path: 'participants',
    loadChildren: () => import('./modules/participants/participants.module')
      .then(m => m.ParticipantsModule),
  },
  {
    path: 'contacts',
    loadChildren: () => import('./modules/contacts/contacts.module')
      .then(m => m.ContactsModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module')
      .then(m => m.ProfileModule),
    canActivate: [UserGuard]
  },
  {
    path: 'gallery',
    loadChildren: () => import('./modules/gallery/gallery.module')
      .then(m => m.GalleryModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module')
      .then(m => m.AuthModule),
    canActivate: [NonAuthGuard]
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./modules/page-not-found/page-not-found.module')
      .then(m => m.PageNotFoundModule)
  },
  {
    path: 'offline',
    loadChildren: () => import('./modules/offline/offline.module')
      .then(m => m.OfflineModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: '/page-not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
