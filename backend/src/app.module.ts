import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ArchiveManagerModule } from './modules/archive-manager/archive-manager.module';
import { ProgramModule } from './modules/program/program.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AboutModule } from './modules/about/about.module';
import { ParticipantsModule } from './modules/participants/participants.module';
import { ContactModule } from './modules/contact/contact.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { NewsModule } from './modules/news/news.module';
import { WorksModule } from './modules/works/works.module';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TokenInterceptor } from "./common/interceptors/token.interceptor";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
    }),
    MongooseModule.forRoot(
        `${process.env.DB_PASS}`,
      {
        connectionName: 'master',
        useFindAndModify: false,
      },
    ),
    AuthModule,
    ArchiveManagerModule,
    ProgramModule,
    AboutModule,
    ParticipantsModule,
    ContactModule,
    ProjectsModule,
    NewsModule,
    WorksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TokenInterceptor,
    }
  ],
})
export class AppModule {}
