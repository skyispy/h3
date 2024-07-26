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

@Module({
  imports: [SequelizeModule.forRoot({
    dialect : 'mysql',
    host : "localhost",
    port : 3306,
    username : "root",
    password : "930702",
    database : "waffle",
    autoLoadModels : true,
    synchronize : true,
    sync : {force : false}
  }), UserModule, ItemModule, ItemImageModule, ReviewModule, AuthModule, WishModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
