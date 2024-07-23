import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemImageModule } from './item-image/item-image.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect : 'mysql',
    host : "localhost",
    port : 3306,
    username : "root",
    // password : "930702",
    // database : "waffle",
    autoLoadModels : true,
    synchronize : true,
    sync : {force : false}
  }), ItemModule,ItemImageModule, ItemImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
