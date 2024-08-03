import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemImageModule } from './item-image/item-image.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { WishModule } from './wish/wish.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CommonModule } from './common/common.module';
import { HbsHelpers } from './01hbsHelper/hbsHelper.service';
import * as Handlebars from 'handlebars';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "5835",
    database: "h3",
    autoLoadModels: true,
    synchronize: true,
    sync: { force: false }
  }),
    UserModule,
    ItemModule,
    ItemImageModule,
    ReviewModule,
    AuthModule,
    WishModule,
    CommonModule,
  ConfigModule.forRoot({ isGlobal: true }),
    // ServeStaticModule.forRoot({ // 스태틱 파일 라우팅
    //   rootPath: join(__dirname, "..", "..", "uploads")
    // })
  ],
  controllers: [AppController],
  providers: [AppService, HbsHelpers],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    //  이거 필수 아님! 필요하면 쓰는거!
    Handlebars.registerHelper('concat', HbsHelpers.concat);
    Handlebars.registerHelper('formDate', HbsHelpers.formDate);
    Handlebars.registerHelper('starCount', HbsHelpers.starCount);
    Handlebars.registerHelper('compareUser', HbsHelpers.compareUser);
    Handlebars.registerHelper('priceComma', HbsHelpers.priceComma);
  }
 }
