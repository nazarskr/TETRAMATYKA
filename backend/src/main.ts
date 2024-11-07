import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface";
import * as process from "process";

async function bootstrap() {
  const httpsOptions: HttpsOptions = {
    key: fs.readFileSync(process.env.S_KEY),
    cert: fs.readFileSync(process.env.S_CERT),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.setGlobalPrefix('api');
  await app.listen(443);
}

bootstrap();
