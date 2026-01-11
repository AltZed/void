import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Void Alpha')
    .setDescription('Документация к Альфа версии Void')
    .setVersion('alpha')
    .setContact('Telegram', 't.me/void_messenger', '')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
