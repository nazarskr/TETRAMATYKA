import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ContactsComponent, ContactItemComponent],
    imports: [
      CommonModule,
      ContactsRoutingModule,
      TranslateModule,
      SharedModule,
      ReactiveFormsModule
    ]
})
export class ContactsModule { }
