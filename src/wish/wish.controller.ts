import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { WishService } from './wish.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/common/guard/token.guard';

@ApiTags("위시")
@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) { }

  ///////////////////// POST 위시리스트 토글 눌렀을때 //////////////////////
  @ApiOperation({ summary: "위시리스트 등록" })
  @Post('/regist/:itemId')
  @UseGuards(TokenGuard) // 로그인 필요 !
  // @ApiBody({
  //   schema: {
  //     properties: { itemId: { type: "number" } }
  //   }
  // })
  async toggleWish(@Param('itemId') itemId: number, @Req() req) {
    const wisher = req.user.id
    const result = await this.wishService.toggleWish(itemId, wisher)
    console.log(`Wish작업 결과 = ${result}`)
    return
    // 등록되면 true 삭제되면 false로 갈거임
  }
}