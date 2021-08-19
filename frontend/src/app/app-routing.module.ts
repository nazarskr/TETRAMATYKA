import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';

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
    path: 'projects',
    loadChildren: () => import('./modules/projects/projects.module')
      .then(m => m.ProjectsModule),
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
    path: 'page-not-found',
    loadChildren: () => import('./modules/page-not-found/page-not-found.module')
      .then(m => m.PageNotFoundModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: '/page-not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
