import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { ItemService } from './item.service';
import { createItemDTO } from './dto/create.ItemDTO';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("아이템")
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}


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

  @ApiOperation({summary: "아이템 등록"})
  @ApiBody({
    schema: {
      properties: {title: { type: "string"}, content: { type: "string"}, category: {type :"string"}, brand: {type : "string"}, sold : {type : "boolean"}}
    }
  })

  @Post('registItem')
  async createItem(@Body() itemBody : createItemDTO) {
   await this.itemService.createItem(itemBody);
  }

  


}