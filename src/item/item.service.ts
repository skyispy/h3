import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './model/item.model';
import { createItemDTO, updateItemDTO } from './dto/create.ItemDTO';
import { ItemImage } from './model/itemImage.model';
import { User } from 'src/user/model/user.model';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Item) private readonly itemModel: typeof Item,
        @InjectModel(ItemImage) private readonly itemImageModel: typeof ItemImage
    ) { }

    //////////////////////////// 상품 등록 ////////////////////////////
    async createItem(createItemDTO: createItemDTO, fk_sellerId: number): Promise<Item> {
        const { title, content, category, brand, sold, price } = createItemDTO
        const { id } = await this.itemModel.create({
            title, content, category, brand, sold: false, fk_sellerId, price
        })
        return id;
    }
    async createItemImagePath(fk_itemId, imgPath) {
        await this.itemImageModel.create({
            fk_itemId, imgPath
        })
    }

    //////////////////////////// 상품 상세 include 셀러정보, 이미지 정보 ////////////////////////////
    async selectItem(id: number) {
        return await this.itemModel.findOne({
            where: { id },
            include: [{
                model: User,
                as: 'sellerId'
            }, {
                model: ItemImage,
                as: 'imgs',
                attributes: ['imgPath'] // 아이템 이미지 정보[]
            }]
        })
    }

    //////////////////////////// 상품 구매시 ////////////////////////////
    async purchaseItem(id: number, buyerId: number) {
        return await this.itemModel.update({ fk_buyerId: buyerId, sold: true }, { where: { id } })
    }

    //////////////////////////// 상품 수정 ////////////////////////////
    async updateItem(id: number, data: updateItemDTO) {
        const { title, content, category, brand, price } = data;
        return await this.itemModel.update({ title, content, category, brand, price }, { where: { id } })
    }
    async deleteImg(fk_itemId: number) {
        return await this.itemImageModel.destroy({ where: { fk_itemId }, force: true })
    }

    //////////////////////////// 상품 삭제 ////////////////////////////
    async deleteItem(id: number) {
        return await this.itemModel.destroy({ where: { id }, force: true });
    }















    async readItemAll() {
        return await this.itemModel.findAll();
    }


    async selectBrandItem(brand) {
        return await this.itemModel.findAll({ where: { brand } });
    }

    async selectCategoryItem(category) {
        return await this.itemModel.findAll({ where: { category } });
    }

    async selectTitleItem(title) {
        return await this.itemModel.findAll({ where: { title } })
    }

    async readItemOne2(fk_sellerId) {
        return await this.itemModel.findOne({ where: { fk_sellerId } })
    }

}
