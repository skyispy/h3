import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewModule } from './review/review.module';
import { WishModule } from './wish/wish.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SequelizeModule.forRoot({
    ////////////////// 시퀄라이즈 커넥션 //////////////////////
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "....",
    database: "test",
    autoLoadModels: true,
    synchronize: true,
    sync: { force: false }
  }), UserModule, ItemModule, ReviewModule, WishModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
