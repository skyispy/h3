import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './model/review.model';
import { SellerReply } from './model/sellerReply.model';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule, SequelizeModule.forFeature([Review, SellerReply])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
