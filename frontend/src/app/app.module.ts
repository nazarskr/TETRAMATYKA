import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from '@shared/constants/loader-config';
import { AppInitService } from '@core/services/app-init/app-init.service';
import { CurrentYearInterceptor } from '@core/interceptors/current-year.interceptor';
import { AdminGuard } from '@core/guards/admin.guard';
import { ArchiveYear } from "@shared/interfaces/admin";

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export function appInit(appInitService: AppInitService): () => Promise<ArchiveYear> {
  return () => appInitService.getCurrentYear();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: false,
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    // NgxUiLoaderHttpModule.forRoot({
    //   exclude: [...loaderExclude],
    //   minTime: 100,
    //   showForeground: true
    // }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppInitService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CurrentYearInterceptor,
      multi: true
    },
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
