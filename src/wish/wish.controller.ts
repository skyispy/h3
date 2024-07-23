import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { WishService } from './wish.service';
import { registWishDTO } from './dto/wish.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("위시")
@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) { }

  ///////////////////// 위시리스트 등록 //////////////////////
  @ApiOperation({ summary: "위시리스트 등록" })
  @ApiBody({
    schema: {
      properties: { onOff: { type: "boolean" }, fk_userId: { type: "number" }, fk_itemId: { type: "number" } }
    }
  })
  @Post('/regist')
  registWish(@Body() wishData: registWishDTO) {
    return this.wishService.registWish(wishData);
  }

  ///////////////////// 위시리스트 삭제(force) //////////////////////
  @ApiOperation({ summary: "위시리스트 삭제(force)" })
  @Delete('/delWish/:id')
  deleteWish(@Param("id") delWishItemId: number) {
    return this.wishService.deleteWish(delWishItemId);
  }
}
