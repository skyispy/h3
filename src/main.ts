import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import { LogInterceptor } from './common/interceptor/logging.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import { HbsHelpers } from './01hbsHelper/hbsHelper.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  
  app.useGlobalInterceptors(new LogInterceptor); // 인터셉터 전역 설정

  // app.setBaseViewsDir(join(__dirname, "public", "page"));
  app.setBaseViewsDir(join(__dirname, '..', 'src', "public", "page"));
  app.setViewEngine('hbs');

  hbs.registerPartials(join(__dirname, '..', 'src', 'public', 'page', 'partials'));

  hbs.registerHelper('concat', HbsHelpers.concat);
  hbs.registerHelper('formDate', HbsHelpers.formDate);
  hbs.registerHelper('starCount', HbsHelpers.starCount);
  hbs.registerHelper('compareUser', HbsHelpers.compareUser);
  hbs.registerHelper('priceComma', HbsHelpers.priceComma);

  app.useStaticAssets(join(__dirname, '..', 'src', 'public'))

  
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
