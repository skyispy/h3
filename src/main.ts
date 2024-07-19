import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const config = new DocumentBuilder()
  .setTitle("h3")
  .setDescription("의류 중고 사이트입니당")
  .addTag("회원")
  .addTag("의류 마켓")
  .addTag("판매자 스토어")
  .build();

  const document = SwaggerModule.createDocument(app, config);
  // api 적으면됨
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
