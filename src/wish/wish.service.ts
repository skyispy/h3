import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wish } from './model/wish.model';
import { registWishDTO } from './dto/wish.dto';

@Injectable()
export class WishService {
    constructor(
        @InjectModel(Wish)
        private readonly wishModel: typeof Wish) { }

    ///////////////////// 위시리스트 등록 //////////////////////
    async registWish(wishData: registWishDTO): Promise<Wish> {
        const { onOff, fk_userId, fk_itemId } = wishData;
        return await this.wishModel.create({ onOff, fk_userId, fk_itemId })
    }


    ///////////////////// 위시리스트 삭제 //////////////////////
    async deleteWish(delWishItemId: number): Promise<number> {
        return await this.wishModel.destroy({ where: { fk_itemId: delWishItemId }, force: true })
    }
}
