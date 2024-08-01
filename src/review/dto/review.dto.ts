///////////////////// 스토어 리뷰 등록 //////////////////////
export class registReviewDTO {
    reviewComment: string
    star: number
    fk_sellerId: number
}

///////////////////// 스토어 리뷰 수정 //////////////////////
export class updateReviewDTO {
    reviewComment: string
    star: number
}

///////////////////// 판매자 대댓글 등록 //////////////////////
export class registReplyDTO {
    replyComment: string
    fk_reviewId: number
}

///////////////////// 판매자 대댓글 수정 //////////////////////
export class updateReplyDTO {
    replyComment: string
}