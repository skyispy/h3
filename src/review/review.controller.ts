import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { registReplyDTO, registReviewDTO, updateReplyDTO, updateReviewDTO } from './dto/review.dto';
import { TokenGuard } from 'src/common/guard/token.guard';

@ApiTags("리뷰")
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService
  ) { }

  ///////////////////// 스토어 리뷰 등록 ////////////////////// 완
  @ApiOperation({ summary: "리뷰 등록" })
  @ApiBody({
    schema: {
      properties: { reviewComment: { type: "string" }, star: { type: "number" }, fk_sellerId: { type: "number" } }
    }
  })
  @Post('/registReview')
  @UseGuards(TokenGuard) // 가드로 req.user에 풀어 !
  async registReview(@Body() reviewData: registReviewDTO, @Req() req: any) {
    return await this.reviewService.registReview(reviewData, req.user.id);
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
  @UseGuards(TokenGuard) // 가드로 req.user에 풀어 !
  registReply(@Body() replyData: registReplyDTO, @Req() req: any) {
    return this.reviewService.registReply(replyData, req.user.id)
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