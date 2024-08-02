import { Controller, Post } from '@nestjs/common';
import { ItemImageService } from './item-image.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("아이템이미지")
@Controller('item-image')
export class ItemImageController {
  constructor(private readonly itemImageService: ItemImageService) {}

              
  
}
