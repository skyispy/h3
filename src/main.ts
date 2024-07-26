import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import { LogInterceptor } from './common/interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalInterceptors(new LogInterceptor); // 인터셉터 전역 설정

  // swagger
  const config = new DocumentBuilder()
    .setTitle("TEAM h3")
    .setDescription("REHAND")
    .addTag("인증")
    .addTag("유저")
    .addTag("리뷰")
    .addTag("아이템")
    .addTag("위시")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // api 적으면됨
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
