import { NestFactory } from '@nestjs/core';
import { createConnection } from 'typeorm';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

createConnection().then(async connection => {
  bootstrap();
}).catch(error => console.log('TypeORM connection error: ', error));
