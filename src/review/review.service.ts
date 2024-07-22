import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './model/review.model';
import { registReplyDTO, registReviewDTO, updateReplyDTO, updateReviewDTO } from './dto/review.dto';
import { SellerReply } from './model/sellerReply.model';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review)
        private readonly reviewModel: typeof Review,
        @InjectModel(SellerReply)
        private readonly sellerReplyModel: typeof SellerReply) { }

    ///////////////////// 스토어 리뷰 등록 //////////////////////
    async registReview(reviewData: registReviewDTO): Promise<Review> {
        const { reviewComment, star, fk_sellerId, fk_writerId } = reviewData
        return await this.reviewModel.create({ reviewComment, star, fk_sellerId, fk_writerId })
    }

    ///////////////////// 스토어 리뷰 수정 //////////////////////
    async updateReview(reviewData: updateReviewDTO, id: number): Promise<number[]> {
        const { reviewComment, star } = reviewData;
        return await this.reviewModel.update({ reviewComment, star }, { where: { id } })
    }

    ///////////////////// 스토어 리뷰 삭제(force) //////////////////////
    async deleteReview(id: number): Promise<number> {
        return await this.reviewModel.destroy({ where: { id }, force: true })
    }


    ///////////////////// 판매자 대댓글 등록 //////////////////////
    async registReply(replyData: registReplyDTO): Promise<SellerReply> {
        const { replyComment, fk_sellerId, fk_reviewId } = replyData
        return await this.sellerReplyModel.create({ replyComment, fk_sellerId, fk_reviewId })
    }

    ///////////////////// 판매자 대댓글 수정 //////////////////////
    async updateReply(replyData: updateReplyDTO, id: number): Promise<number[]> {
        const { replyComment } = replyData
        return await this.sellerReplyModel.update({ replyComment }, { where: { id } })
    }

    ///////////////////// 판매자 대댓글 삭제(force) //////////////////////
    async deleteReply(id: number): Promise<number> {
        return await this.sellerReplyModel.destroy({ where: { id }, force: true })
    }
}
