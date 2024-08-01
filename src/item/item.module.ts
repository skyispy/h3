import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './model/item.model';
import { ItemImage } from './model/itemImage.model';

@Module({
  imports: [SequelizeModule.forFeature([Item]), SequelizeModule.forFeature([ItemImage])],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule {}
