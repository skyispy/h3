import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './model/item.model';
import { createItemDTO, updateItemDTO } from './dto/create.ItemDTO';
import { ItemImage } from './model/itemImage.model';
import { User } from 'src/user/model/user.model';
import { Op } from 'sequelize';

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

    //////////////////////////// RENDER 상품 전체 페이지(페이지네이션) ////////////////////////////
    async readItemAll(page: number, limit: number, search: string, itemCategory: string) {
        const offset = (page - 1) * limit; // 데이터를 가져올 시작 인덱스 0, 12, 24

        // 검색 조건 설정 :{}
        const searchSetting: any = {};
        if (search) {
            searchSetting[Op.or] = [
                { title: { [Op.like]: `%${search}%` } }, // 필드에 키워드 포함하는 항목
                { content: { [Op.like]: `%${search}%` } }
            ]
        }
        if (itemCategory) {
            searchSetting.category = itemCategory;
        }

        const { rows, count } = await this.itemModel.findAndCountAll({
            where: searchSetting, limit, offset,
            order: [['id', 'DESC']],
            include: [{
                model: ItemImage,
                as: "imgs",
                order: [['id', 'ASC']],
                attributes: ['imgPath']
            }]
        })
        return { rows, count, totalPages: Math.ceil(count / limit), currentPage: page }
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
}
