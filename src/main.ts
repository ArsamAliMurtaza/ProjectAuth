import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { debug } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
debug(true);
