import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from "ngx-quill";
import { simpleQuillConfig } from "@shared/constants/quill-config";

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
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { OverlayModule } from '@angular/cdk/overlay';

// pipes
import { LocalDatePipe } from './pipes/local-date.pipe';

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
import { ItemDetailsViewComponent } from './components/item-details-view/item-details-view.component';
import { TitledItemsListComponent } from './components/titled-items-list/titled-items-list.component';
import { ItemDetailsSecondaryComponent } from './components/item-details-secondary/item-details-secondary.component';

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
  MatSnackBarModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  DragDropModule,
  MatCardModule,
  OverlayModule
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
    FooterComponent,
    LocalDatePipe,
    ItemDetailsViewComponent,
    TitledItemsListComponent,
    ItemDetailsSecondaryComponent
  ],
  imports: [
    ...materialModules,
    CommonModule,
    TranslateModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    QuillModule.forRoot({
      modules: {...simpleQuillConfig}
    })
  ],
  exports: [
    ...materialModules,
    QuillModule,
    HeaderComponent,
    ChangeLanguageComponent,
    TableActionButtonComponent,
    SimpleDialogComponent,
    UserPermissionDirective,
    DragNDropUploadComponent,
    DragAndDropFieldDirective,
    FooterComponent,
    LocalDatePipe,
    ItemDetailsViewComponent,
    TitledItemsListComponent,
    ItemDetailsSecondaryComponent
  ],
  providers: [
    UnsubscribeOnDestroy
  ]
})
export class SharedModule { }
