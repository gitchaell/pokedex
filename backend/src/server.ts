import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

export const app = (expressInstance?: any) => {
  return NestFactory.create(
    AppModule,
    expressInstance ? new ExpressAdapter(expressInstance) : undefined,
  );
};
