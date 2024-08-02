import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wish } from './model/wish.model';

@Injectable()
export class WishService {
    constructor(
        @InjectModel(Wish)
        private readonly wishModel: typeof Wish) { }

    ///////////////////// 위시리스트 토글 //////////////////////
    async toggleWish(itemId: number, wisher: number): Promise<boolean> {
        // 이 아이템에 내가 위시한게 있는지 확인
        const wish = await this.wishModel.findOne({ where: { fk_userId: wisher, fk_itemId: itemId } })
        // console.log(wish);
        if (wish) {
            // 이미 위시 한게 있으면 삭제 시키고 false를 반환
            await wish.destroy({ force: true });
            return false
        } else {
            // 위시한게 없으면 등록 하고 true를 반환
            await this.wishModel.create({ fk_userId: wisher, fk_itemId: itemId });
            return true
        }
    }


    ///////////////////// 위시 인지 아닌지 체크 //////////////////////
    async checkWish(itemId: number, wisher: number): Promise<boolean> {
        const wish = await this.wishModel.findOne({ where: { fk_userId: wisher, fk_itemId: itemId } })
        if (wish) { // 이미 위시임
            return true
        } else { // 위시 아님
            return false
        }
    }
}
