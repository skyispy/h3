import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const config = new DocumentBuilder()
    .setTitle("TEAM h3")
    .setDescription("REHAND")
    .addTag("유저")
    .addTag("리뷰")
    .addTag("위시")
    .addTag("아이템")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // api 적으면됨
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
