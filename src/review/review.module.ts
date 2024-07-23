import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './model/review.model';
import { SellerReply } from './model/sellerReply.model';

@Module({
  imports: [SequelizeModule.forFeature([Review, SellerReply])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
