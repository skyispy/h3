import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { registReplyDTO, registReviewDTO, updateReplyDTO, updateReviewDTO } from './dto/review.dto';

@ApiTags("리뷰")
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  ///////////////////// 스토어 리뷰 등록 //////////////////////
  @ApiOperation({ summary: "리뷰 등록" })
  @ApiBody({
    schema: {
      properties: { reviewComment: { type: "string" }, star: { type: "number" }, fk_sellerId: { type: "number" }, fk_writerId: { type: "number" } }
    }
  })
  @Post('/registReview')
  registReview(@Body() reviewData: registReviewDTO) {
    return this.reviewService.registReview(reviewData);
  }

  ///////////////////// 스토어 리뷰 수정 //////////////////////
  @ApiOperation({ summary: "리뷰 수정" })
  @ApiBody({
    schema: {
      properties: { reviewComment: { type: "string" }, star: { type: "number" } }
    }
  })
  @Put('/modReview/:id')
  updateReview(@Body() reviewData: updateReviewDTO, @Param("id") updateReviewId: number) {
    return this.reviewService.updateReview(reviewData, updateReviewId);
  }

  ///////////////////// 스토어 리뷰 삭제(force) //////////////////////
  @ApiOperation({ summary: "리뷰 삭제(force)" })
  @Delete('/delReview/:id')
  deleteReview(@Param("id") delReviewId: number) {
    return this.reviewService.deleteReview(delReviewId);
  }

  ///////////////////// 판매자 대댓글 등록 //////////////////////
  @ApiOperation({ summary: "대댓글 등록" })
  @ApiBody({
    schema: {
      properties: { replyComment: { type: "string" }, fk_sellerId: { type: "number" }, fk_reviewId: { type: "number" } }
    }
  })
  @Post('/registReply')
  registReply(@Body() replyData: registReplyDTO) {
    return this.reviewService.registReply(replyData)
  }

  ///////////////////// 판매자 대댓글 수정 //////////////////////
  @ApiOperation({ summary: "대댓글 수정" })
  @ApiBody({
    schema: {
      properties: { replyComment: { type: "string" } }
    }
  })
  @Put('/modReply/:id')
  updateReply(@Body() replyData: updateReplyDTO, @Param("id") updateReplyId: number) {
    return this.reviewService.updateReply(replyData, updateReplyId)
  }

  ///////////////////// 판매자 대댓글 삭제(force) //////////////////////
  @ApiOperation({ summary: "대댓글 삭제(force)" })
  @Delete('/delReply/:id')
  deleteReply(@Param("id") delReplyId: number) {
    return this.reviewService.deleteReply(delReplyId);
  }
}