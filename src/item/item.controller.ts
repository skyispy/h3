import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, Render, UseGuards, BadRequestException, UnauthorizedException, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { createItemDTO, updateItemDTO } from './dto/create.ItemDTO';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ItemParamPipe } from './pipe/item.pipe';
import { TokenGuard } from 'src/common/guard/token.guard';
import { JwtService } from '@nestjs/jwt';
import { WishService } from 'src/wish/wish.service';

@ApiTags("아이템")
@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly jwtService: JwtService,
    private readonly wishService: WishService,
  ) { }

  //////////////////////////// RENDER 상품 전체 페이지/검색 요청 (페이지네이션) ////////////////////////////
  @Get('market')
  // @Render('')
  async marketMain(
    @Query('page') page: number = 1, // 기본보여질 페이지 번호
    @Query('limit') limit: number = 12, // 12개씩 보여줌
    @Query('search') search: string,
    @Query('category') itemCategory: string) {
    console.log(page, limit, search, itemCategory)
    return await this.itemService.readItemAll(page, limit, search, itemCategory)
  }
  // 카테고리 요청 -> /item/market?category=상의
  // 검색 요청 -> /item/market?search= 검색어!

  //////////////////////////// RENDER 상품 작성 페이지 ////////////////////////////
  @Get('sell')
  @Render('assign')
  @UseGuards(TokenGuard) // 토큰 없으면 거부
  sellRender(@Req() req) {
    const loginId = req.user.id
    console.log(loginId); // 현재접속 유저 id
    return { loginId };
  }

  //////////////////////////// RENDER 상품 상세 페이지 ////////////////////////////
  @ApiOperation({ summary: "특정 아이디 아이템 데이터" })
  @Get(":id")
  @Render('view') // 상세페이지 렌더 해야 함 !!!
  async selectItem(@Param("id") id: number, @Req() req: Request) {
    const token = req.cookies.loginToken
    const data = await this.itemService.selectItem(id)
    // console.log(data);
    if (!token) {
      return { data } // 상품정보,+ 셀러 정보 + 이미지 정보 배열[]
    } else {
      try {
        const loginUserId = await this.jwtService.verify(token).id
        const like = await this.wishService.checkWish(id, loginUserId)
        // console.log(like) // 현재 위시 인지 아닌지
        // console.log(loginUserId); // 현재접속 유저 id
        return { data, loginUserId, like };
      } catch (error) {
        return { data };
      }
    }
  }

  //////////////////////////// PUT 구매 버튼 눌렀을때(판매완료) ////////////////////////////
  @ApiOperation({ summary: "구매 시" })
  @Put("/purchase/:id") // 아이템 id로 요청
  @UseGuards(TokenGuard) // 로그인 필요 !
  async purchaseItem(@Param("id", ItemParamPipe) id: number, @Req() req) {
    const buyerId = req.user.id
    console.log(id, buyerId)
    await this.itemService.purchaseItem(id, buyerId)
    return; // 구매내역으로 클라이언트에서 리다이렉트 plz
  }

  //////////////////////////// POST 상품 등록시 ////////////////////////////
  @ApiOperation({ summary: "아이템 등록" })
  @ApiBody({
    schema: {
      properties: { title: { type: "string" }, content: { type: "string" }, category: { type: "string" }, brand: { type: "string" }, sold: { type: "boolean" }, fk_sellerId: { type: "number" }, price: { type: "number" } }
    }
  })
  @Post('registItem')
  @UseGuards(TokenGuard) // 로그인 필요 !
  async createItem(@Body() itemBody: createItemDTO, @Req() req) {
    const loginId = req.user.id
    const id = await this.itemService.createItem(itemBody, loginId);
    // console.log(itemBody);
    for (let i = 0; i < itemBody.img.length; i++) {
      await this.itemService.createItemImagePath(id, itemBody.img[i])
    }
    return
  }

  //////////////////////////// RENDER 상품 수정 페이지 ////////////////////////////
  @Get("/modify/:id")
  @UseGuards(TokenGuard) // 로그인 필요
  // @Render('') // 수정 페이지 렌더 해야 함 !!!
  async modPageRender(@Param("id") id: number, @Req() req) {
    const data = await this.itemService.selectItem(id)
    if (data.fk_sellerId === req.user.id) {
      return { data }
    } else {
      throw new UnauthorizedException // 내가 쓴 글 아니면 접근권한 x 401
    }
  }

  //////////////////////////// PUT 상품 수정! ////////////////////////////
  @ApiOperation({ summary: "아이템 수정" })
  @ApiBody({
    schema: {
      properties: { title: { type: "string" }, price: { type: "number" }, content: { type: "string" }, category: { type: "string" }, brand: { type: "string" } }
    }
  })
  @Put("/update/:id")
  @UseGuards(TokenGuard) // 로그인 필요
  async UpdateItem(@Body() itemData: updateItemDTO, @Param("id") updateItemId: number) {
    await this.itemService.updateItem(updateItemId, itemData)
    /// 새로운 아이템정보를 아이템 아이디로 수정하고,
    await this.itemService.deleteImg(updateItemId)
    /// 아이템 아이디의 이미지를 모두 삭제,
    for (let i = 0; i < itemData.img.length; i++) {
      /// 다시 포문으로 재업로드.
      await this.itemService.createItemImagePath(updateItemId, itemData.img[i])
    }
    return
  }

  //////////////////////////// DELETE 상품 삭제 ////////////////////////////
  @ApiOperation({ summary: "아이템 삭제" })
  @Delete('/delItem/:id')
  async deleteItem(@Param("id") delId: number) {
    return await this.itemService.deleteItem(delId)
  }






  @ApiOperation({ summary: "특정 타이틀 아이템 데이터" })
  @Get("/title/:title")
  selectTitleItem(@Param("title") title: string) {
    return this.itemService.selectTitleItem(title)
  }

  @ApiOperation({ summary: "특정 브랜드 아이템 데이터" })
  @Get("/brand/:brand")
  selectBrandItem(@Param("brand") brand: string) {
    return this.itemService.selectBrandItem(brand)
  }

  @ApiOperation({ summary: "특정 카테고리 아이템 데이터" })
  @Get("/category/:category")
  selectCategoryItem(@Param("category") category: string) {
    return this.itemService.selectCategoryItem(category)
  }
}