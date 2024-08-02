import { Module } from '@nestjs/common';
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

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "....",
    database: "test",
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
  providers: [AppService],
})
export class AppModule { }
