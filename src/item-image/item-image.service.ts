import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemImage } from 'src/item/model/itemImage.model';
import { cerateItemImageDTO } from './DTO/createitem-image';

@Injectable()
export class ItemImageService {
    constructor(@InjectModel(ItemImage) private readonly itemimageModel : typeof ItemImage) {}

    async cerateItemImage ( createItemImageDTO : cerateItemImageDTO) {
        const { id , imgPath , itemId } = createItemImageDTO
    }

    async updateitemimage(id, imgPath) {
        return await this.itemimageModel.update({imgPath} , {where :{id}})
    }
}
