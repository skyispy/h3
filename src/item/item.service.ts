import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './model/item.model';
import { createItemDTO } from './dto/create.ItemDTO';
import { ItemImage } from './model/itemImage.model';
import { where } from 'sequelize';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Item) private readonly itemModel : typeof Item,
    @InjectModel(ItemImage) private readonly itemImageModel: typeof ItemImage
) {}

    async createItem (createItemDTO : createItemDTO, fk_sellerId: number): Promise<any> {
        const { title , content , category , brand , sold, price } = createItemDTO
        const {id} = await this.itemModel.create({
            title, content, category, brand, sold : false , fk_sellerId , price
        })
        return id;
    }

    async readItemAll() {
        return await this.itemModel.findAll(
        { order : [['createdAt','DESC']]}
        );
    }

    async selectItem(id) {
        return await this.itemModel.findOne({where : {id}})
    }
    async selectBrandItem(brand) {
        return await this.itemModel.findAll({where : {brand}});
    }

    async selectCategoryItem(category) {
        return await this.itemModel.findAll({where : {category}});
    }

    async selectTitleItem(title) {
        return await this.itemModel.findAll({where : {title}})
    }

    async updateItem(id, data) {
        const { title , content ,category , brand ,price} = data;
        return await this.itemModel.update({title, content, category, brand, price}, {where : {id}})
    }

    async deleteItem(id) {
        return await this.itemModel.destroy({where : { id }, force: true});
    }

    async selectPriceItem(price) {
        return await this.itemModel.findAll({ where :{price}})
    }

    // async sellItem()
    async createItemImagePath(fk_itemId, imgPath) {
        await this.itemImageModel.create({
            fk_itemId, imgPath
        })
    }

    async readItemOne2(fk_sellerId) {
    return await this.itemModel.findOne({where : {fk_sellerId}})
    }
    async soldoutItem(fk_buyerId: number, id: number) {
        return await this.itemModel.update({fk_buyerId, sold : true }, { where : { id }})
    }

}
 