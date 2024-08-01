import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, Render } from '@nestjs/common';
import { ItemService } from './item.service';
import { createItemDTO, updateItemDTO } from './dto/create.ItemDTO';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response} from 'express';
import { ItemParamPipe } from './pipe/item.pipe';

@ApiTags("아이템")
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('')
  @Render('market')
  marketRender() {
    return;
  }

  @Get('sell')
  @Render('assign')
  sellRender() {
    return;
  }

  @ApiOperation({summary : "특정 아이디 아이템 데이터"})
  @Get("/:id")
  selectItem(@Param("id") id : number ) {
    return this.itemService.selectItem(id)
  }

  @ApiOperation({summary : "특정 타이틀 아이템 데이터"})
  @Get("/title/:title")
  selectTitleItem(@Param("title") title : string) {
    return this.itemService.selectTitleItem(title)
  }

  @ApiOperation({ summary : "특정 브랜드 아이템 데이터"})
  @Get("/brand/:brand")
  selectBrandItem(@Param("brand") brand : string) {
    return this.itemService.selectBrandItem(brand)
  }

  @ApiOperation({ summary : "특정 카테고리 아이템 데이터"})
  @Get("/category/:category")
  selectCategoryItem(@Param("category") category : string) {
    return this.itemService.selectCategoryItem(category)
  }
  @ApiOperation({ summary : "아이템 삭제"})
  @Delete('/delItem/:id')
  async deleteItem(@Param("id") delId : number) {
    await this.itemService.deleteItem(delId)
  }

  @ApiOperation({ summary : "아이템 수정"})
  @ApiBody({
    schema : {
      properties: {title : {type : "string"},price : { type : "number" }, content : {type : "string"},category : {type : "string"},brand : { type : "string"}}
    }
  })
  @Put("/update/:id")
  async UpdateItem(@Body() ItemData :updateItemDTO, @Param("id") updateItemId : number ) {
    await this.itemService.updateItem(updateItemId ,ItemData)
  }

  @ApiOperation({summary: "아이템 등록"})
  @ApiBody({
    schema: {
      properties: {title: { type: "string"}, content: { type: "string"}, category: {type :"string"}, brand: {type : "string"}, sold : {type : "boolean"}, fk_sellerId : {type : "number"}, price : {type : "number"}}
    }
  })
  @Post('registItem')
  async createItem(@Body() itemBody : createItemDTO, @Req() req: Request, @Res() res: Response) {
    // const {userId} = req.user
   const id = await this.itemService.createItem(itemBody, 1);
   await this.itemService.createItemImagePath(id, "경로")
   await console.log(id);
   res.send(1);
  }

  @ApiOperation({ summary : "판매완료"}) // buyerId 가 들어가야함
  @Post("view/:id") // 메인 페이지로 돌아가야함 
  async sellItem(@Param("id", ItemParamPipe) itemId: number, @Res() res: Response) {
     await this.itemService.soldoutItem(1, itemId);
    res.redirect('/')
  }
}