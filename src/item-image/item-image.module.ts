import { Module } from '@nestjs/common';
import { ItemImageService } from './item-image.service';
import { ItemImageController } from './item-image.controller';
import sequelize from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemImage } from 'src/item/model/itemImage.model';

@Module({
  imports : [SequelizeModule.forFeature([ItemImage])],
  controllers: [ItemImageController],
  providers: [ItemImageService],
})
export class ItemImageModule {}
