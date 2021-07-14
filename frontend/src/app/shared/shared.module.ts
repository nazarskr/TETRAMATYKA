import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule} from '@angular/material/snack-bar';

// components
import { HeaderComponent } from './components/header/header.component';
import { ChangeLanguageComponent } from './components/change-language/change-language.component';
import { UnsubscribeOnDestroy } from './directives/unsubscribe-on-destroy';
import { TableActionButtonComponent } from './components/table-action-button/table-action-button.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { UserPermissionDirective } from './directives/user-permission.directive';
import { DragNDropUploadComponent } from './components/drag-n-drop-upload/drag-n-drop-upload.component';
import { DragAndDropFieldDirective } from './directives/drag-and-drop-field.directive';
import { FooterComponent } from './components/footer/footer.component';

const materialModules = [
  MatButtonModule,
  MatSelectModule,
  FlexLayoutModule,
  MatIconModule,
  MatTableModule,
  MatTooltipModule,
  MatDialogModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDividerModule,
  MatSnackBarModule
];


@NgModule({
  declarations: [
    UnsubscribeOnDestroy,
    HeaderComponent,
    ChangeLanguageComponent,
    TableActionButtonComponent,
    SimpleDialogComponent,
    UserPermissionDirective,
    DragNDropUploadComponent,
    DragAndDropFieldDirective,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    QuillModule.forRoot(),
    ...materialModules,
  ],
  exports: [
    ...materialModules,
    HeaderComponent,
    ChangeLanguageComponent,
    TableActionButtonComponent,
    SimpleDialogComponent,
    QuillModule,
    UserPermissionDirective,
    DragNDropUploadComponent,
    DragAndDropFieldDirective,
    FooterComponent
  ],
  providers: [
    UnsubscribeOnDestroy
  ]
})
export class SharedModule { }
