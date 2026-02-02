import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

export const app = async (expressInstance?: any) => {
  const app = await NestFactory.create(AppModule, expressInstance ? new ExpressAdapter(expressInstance) : undefined);
  app.enableCors({
    origin: '*', // For development only
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  return app;
};
