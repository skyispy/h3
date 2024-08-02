import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './model/item.model';
import { ItemImage } from './model/itemImage.model';
import { CommonModule } from 'src/common/common.module';
import { WishModule } from 'src/wish/wish.module';

@Module({
  imports: [
    WishModule,
    CommonModule,
    SequelizeModule.forFeature([Item]),
    SequelizeModule.forFeature([ItemImage])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule { }
