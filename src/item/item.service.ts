import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './model/item.model';
import { createItemDTO } from './dto/create.ItemDTO';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Item) private readonly itemModel : typeof Item) {}

    async createItem (createItemDTO : createItemDTO) {
        const { title , content , category , brand , sold } = createItemDTO
        await this.itemModel.create({
            title, content, category, brand, sold : false
        })
    }

    async readItemAll() {
        return await this.itemModel.findAll();
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
    // async readItemOne2(sellerId) {
    //     return await this.itemModel.findOne({where : {sellerId}})
    // }
    async updateitem(id, title, content, category, brand) {
        return await this.itemModel.update({title, content, category, brand}, {where : {id}})
    }

    async deleteitem(id) {
        return await this.itemModel.destroy({where : { id }, force: true});
    }

    async image(userId,dada) {
        await this.itemModel.create({userId});
        const data = await this.itemModel.findAll();
    }
}
