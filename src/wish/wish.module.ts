import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { Wish } from './model/wish.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CommonModule,
    SequelizeModule.forFeature([Wish])
  ],
  controllers: [WishController],
  providers: [WishService],
  exports: [WishService],
})
export class WishModule { }
