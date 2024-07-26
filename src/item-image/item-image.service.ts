import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemImage } from 'src/item/model/itemImage.model';
import { cerateItemImageDTO } from './dto/createitem-image';

@Injectable()
export class ItemImageService {
    constructor(@InjectModel(ItemImage) private readonly itemimageModel : typeof ItemImage) {}

        // 아이템 이미지 생성
    async cerateItemImage ( createItemImageDTO : cerateItemImageDTO) {
        const { id , imgPath , itemId } = createItemImageDTO
    }

    async updateitemimage(id, imgPath) {
        return await this.itemimageModel.update({imgPath} , {where :{id}})
    }
}
